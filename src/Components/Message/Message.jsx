import React from 'react'

const Message = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-poppins">
    {/* Sidebar */}
    <div className="w-1/4 bg-white shadow-md border-r">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>
      <ul className="overflow-y-auto">
        <li className="flex items-center p-3 border-b hover:bg-gray-100">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="ml-3">
            <h2 className="font-medium">Odama Studio</h2>
            <p className="text-sm text-gray-500">Mas Happy Typing...</p>
          </div>
        </li>
        <li className="flex items-center p-3 border-b hover:bg-gray-100">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="ml-3">
            <h2 className="font-medium">Hatypo Studio</h2>
            <p className="text-sm text-gray-500">Mornin: Lagi chat!</p>
          </div>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </div>

    {/* Chat Area */}
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-3">
          <h2 className="font-bold">Odama Studio</h2>
          <p className="text-sm text-gray-500">14 members</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Message 1 */}
        <div className="flex">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="ml-3 bg-gray-100 p-3 rounded-lg">
            <p className="font-medium">Mas Happy</p>
            <p>Gayus tahun depan liburan ke Jepang!! 🇯🇵🇯🇵</p>
            <p className="text-sm text-gray-500">5:00 PM</p>
          </div>
        </div>
        {/* Message 2 */}
        <div className="flex flex-row-reverse">
          <div className="w-10 h-10 bg-blue-300 rounded-full"></div>
          <div className="mr-3 bg-blue-100 p-3 rounded-lg">
            <p className="font-medium">You</p>
            <p>Gokill!!</p>
            <p className="text-sm text-gray-500">5:02 PM</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 focus:outline-none"
          placeholder="Type a message"
        />
        <button className="ml-3 bg-[#f16f22] text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  </div>
  )
}

export default Message
