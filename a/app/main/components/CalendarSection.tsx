'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Elder {
  name: string;
  age: number;
}

export default function CalendarSection() {
  const [date, setDate] = useState<Date>(new Date());
  const [assignedElders, setAssignedElders] = useState<Elder[]>([]);

  // 드래그된 데이터를 받을 때 실행
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const elder: Elder = JSON.parse(data);

    // 중복 방지
    const alreadyAssigned = assignedElders.find(e => e.name === elder.name);
    if (!alreadyAssigned) {
      setAssignedElders(prev => [...prev, elder]);
    }
  };

  return (
    <div className="calendar-wrapper">
      <h3 className="calendar-title">금일 방문예정 어르신</h3>

      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        locale="ko-KR"
      />

      {/* 드래그 드롭 영역 */}
      <div
        className="visit-info drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {assignedElders.length > 0 ? (
          assignedElders.map((person, idx) => (
            <div key={idx}>
              <strong>{person.name}</strong> ({person.age}세)
            </div>
          ))
        ) : (
          <p>👉 여기에 어르신을 드래그 해주세요</p>
        )}
      </div>
    </div>
  );
}
