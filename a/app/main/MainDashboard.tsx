'use client';

import './main.css';
import './calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';

const elders = [
  { name: '박우철', age: 76, img: '/elders/elder1.jpg' },
  { name: '이복자', age: 79, img: '/elders/elder2.jpg' },
  { name: '김성호', age: 76, img: '/elders/elder3.jpg' },
  { name: '한영숙', age: 72, img: '/elders/elder4.jpg' },
  { name: '장기호', age: 88, img: '/elders/elder5.jpg' },
  { name: '오말순', age: 77, img: '/elders/elder6.jpg' },
  { name: '이정근', age: 78, img: '/elders/elder7.jpg' },
  { name: '강노신', age: 89, img: '/elders/elder8.jpg' },
  { name: '최정애', age: 73, img: '/elders/elder9.jpg' },
];

export default function MainDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visitData, setVisitData] = useState<Record<string, typeof elders>>({});

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const elder = JSON.parse(data);
    const dateKey = selectedDate.toISOString().split('T')[0];

    setVisitData((prev) => {
      const currentList = prev[dateKey] || [];
      const isAlreadyAdded = currentList.some((e) => e.name === elder.name);

      if (isAlreadyAdded) return prev;

      return {
        ...prev,
        [dateKey]: [...currentList, elder],
      };
    });
  };

  const dateKey = selectedDate.toISOString().split('T')[0];
  const todaysVisits = visitData[dateKey] || [];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">🧠 TAMI</div>
        <h2>어르신 정보</h2>
        <ul className="elder-list">
          {elders.map((elder, i) => (
            <li
              key={i}
              className="elder-card"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData('text/plain', JSON.stringify(elder))
              }
            >
              <img src={elder.img} alt={elder.name} />
              <div>
                <div>이름: {elder.name}</div>
                <div>나이: {elder.age}세</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-area">
        <header className="top-bar">
          <nav className="menu">
            <span className="active">환자목록</span>
            <span>레포트</span>
            <span>SOS</span>
            <span>설정</span>
          </nav>
          <div className="search-user">
            <input type="text" placeholder="어르신 검색" />
            <div className="profile-icon">👨‍⚕️</div>
          </div>
        </header>

        <div className="alert">
          ⚠️ 한영숙님의 우울 발화가 5회 감지되었습니다.
        </div>

        <section className="content-section">
          <div className="visit-section">
            <h3 className="calendar-title">금일 방문예정 어르신</h3>

            <Calendar
              onChange={(value) => setSelectedDate(value as Date)}
              value={selectedDate}
              locale="ko-KR"
            />

            <div
              className="visit-info drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {todaysVisits.length > 0 ? (
                todaysVisits.map((person, idx) => (
                  <div key={idx} className="visit-item">
                    <strong>{person.name}</strong> ({person.age}세)
                    <button
                      className="remove-btn"
                      onClick={() => {
                        const updated = todaysVisits.filter(
                          (p) => p.name !== person.name
                        );
                        setVisitData((prev) => ({
                          ...prev,
                          [dateKey]: updated,
                        }));
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <p>👉 여기에 어르신을 드래그 해주세요</p>
              )}
            </div>
          </div>

          <div className="memo-section">
            <h3>Memo</h3>
            <textarea placeholder="여기에 메모를 작성하세요..." />
          </div>
        </section>
      </main>
    </div>
  );
}
