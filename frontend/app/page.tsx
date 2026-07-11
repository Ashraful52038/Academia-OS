export default function Home() {
  return (
    // এই h-screen এবং bg-[#0a192f] এর কারণে শুধু এই পেজটিই ডার্ক ব্লু দেখাবে
    <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center text-white">
      
      <h1 className="text-4xl font-bold tracking-wider mb-2">Academia-OS</h1>
      <p className="text-gray-400">University Department Management</p>
      
      {/* এখানে পরবর্তীতে আপনার লগইন ফরম বা অন্য কোড বসাতে পারবেন */}
      
    </div>
  );
}