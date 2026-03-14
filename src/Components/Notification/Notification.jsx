import React from 'react'

const notifications = [
    {
      date: "Today",
      items: [
        {
          id: 1,
          title: "John Doe has submitted a leave request for July 25–27, 2024.",
          time: "09:00 PM",
          icon: "📝",
        },
        {
          id: 2,
          title: "Michael Brown's contract is up for renewal on July 21, 2024.",
          time: "05:10 PM",
          icon: "⚠️",
        },
        {
          id: 3,
          title: "Emily Davis has set up a meeting for July 20, 2024, at 3:00 PM.",
          time: "03:47 PM",
          icon: "📅",
        },
        {
          id: 4,
          title: "Matthew Martinez has scheduled a meeting for July 23, 2024.",
          time: "11:30 AM",
          icon: "📅",
        },
        {
          id: 5,
          title: "Nnifer Harris's contract renewal is up for review on November 3, 2024.",
          time: "10:00 AM",
          icon: "⚠️",
        },
      ],
    },
    {
      date: "Tomorrow",
      items: [
        {
          id: 6,
          title: "Anthony White has been added to the team as of today.",
          time: "04:30 PM",
          icon: "👤",
        },
      ],
    },
  ];

const Notification = () => {
  return (
    <div className=" mx-auto bg-white border rounded-lg shadow-lg p-4 font-poppins">
    <div className="flex justify-between items-center border-b pb-2 mb-4">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <button className="text-blue-500 hover:underline">Mark all as read</button>
    </div>

    {notifications.map((section) => (
      <div key={section.date}>
        <h3 className="text-gray-600 text-sm font-semibold mb-2">{section.date}</h3>
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li
              key={item.id}
              className="flex items-start p-3 border border-gray-200 rounded-lg hover:shadow-sm"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full mr-3">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{item.title}</p>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  )
}

export default Notification
