import React, { useState, useEffect } from 'react';
import { apiConnector } from "../services/apiConnector";
import { useSelector } from "react-redux";

const MyStudents = () => {
    const { token } = useSelector((state) => state.auth);
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [cashAmount, setCashAmount] = useState("");

    const fetchStudents = async () => {
        try {
            const res = await apiConnector("GET", "/api/v1/instructor/my-students", null, { Authorization: `Bearer ${token}` });
            if (res.data.success) {
                setStudents(res.data.data);
            }
        } catch (e) {
            console.error("Error fetching CRM students");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [token]);

    const handleLogCash = async (e) => {
        e.preventDefault();
        try {
            await apiConnector("POST", "/api/v1/instructor/log-cash", {
                studentId: selectedStudent._id,
                planId: "60d5ec49c1b9a24684b...dummyID", // Would be selected dynamically
                amount: Number(cashAmount),
                daysToAdd: 30
            }, { Authorization: `Bearer ${token}` });
            
            setShowModal(false);
            alert("Offline Cash Payment logged! 30 days added to student access.");
        } catch (error) {
            alert("Failed to log payment. Check subscription limits.");
        }
    };

    return (
        <div className="text-white p-6">
            <h1 className="text-3xl font-bold mb-6">My Students (CRM)</h1>
            <div className="bg-richblack-800 rounded-md p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-richblack-600 text-richblack-200">
                            <th className="py-2">Student Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(std => (
                            <tr key={std._id} className="border-b border-richblack-700">
                                <td className="py-3 flex items-center gap-3">
                                    <img src={std.image} className="w-8 h-8 rounded-full" alt="student" />
                                    {std.firstName} {std.lastName}
                                </td>
                                <td>{std.email}</td>
                                <td>
                                    <button 
                                        onClick={() => { setSelectedStudent(std); setShowModal(true); }}
                                        className="bg-yellow-50 text-black px-3 py-1 rounded text-sm cursor-pointer"
                                    >
                                        Log Cash Payment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {students.length === 0 && <p className="text-center mt-4">No students found assigned to your center.</p>}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-richblack-800 p-6 rounded-md w-[400px]">
                        <h2 className="text-xl mb-4">Log Cash for {selectedStudent?.firstName}</h2>
                        <form onSubmit={handleLogCash} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm mb-1 text-richblack-100">Amount Received (₹)</label>
                                <input required type="number" className="w-full bg-richblack-700 text-white p-2 rounded form-style"
                                    value={cashAmount} onChange={(e)=>setCashAmount(e.target.value)} />
                            </div>
                            <div className="flex gap-4 mt-2 justify-end">
                                <button type="button" onClick={() => setShowModal(false)} className="text-richblack-200">Cancel</button>
                                <button type="submit" className="bg-yellow-50 text-black px-4 py-2 rounded">Submit & Extend +30 Days</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MyStudents;
