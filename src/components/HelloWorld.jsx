import { useState } from "react";
// Mengimpor hook useState dari React untuk mengelola state komponen

// Komponen utama untuk aplikasi Todo List
// Komponen ini menangani fungsionalitas daftar tugas (todo list)
export default function HelloWorld() {
    // State untuk menyimpan input teks dari form
    // inputText: menyimpan nilai input saat ini
    // setInputText: fungsi untuk memperbarui nilai input
    const [inputText, setInputText] = useState("");

    // State untuk menyimpan array todos
    // todos: array yang berisi objek todo dengan properti id, text, dan completed
    // setTodos: fungsi untuk memperbarui array todos
    const [todos, setTodos] = useState([]);

    // Fungsi untuk menangani submit form ketika menambah todo baru
    // e: event object dari form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah halaman di-refresh saat form disubmit
        if (inputText.trim() !== "") {
            // Memeriksa apakah input tidak kosong
            // Menambah todo baru ke array todos dengan id unik menggunakan Date.now()
            setTodos([
                ...todos,
                { id: Date.now(), text: inputText, completed: false },
            ]);
            setInputText(""); // Mengosongkan input setelah todo ditambahkan
        }
    };

    // Fungsi untuk mengubah status completed pada todo
    // id: id unik dari todo yang akan diubah statusnya
    const toggleTodo = (id) => {
        // Memetakan array todos dan mengubah status completed jika id cocok
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Fungsi untuk menghapus todo berdasarkan id
    // id: id unik dari todo yang akan dihapus
    const deleteTodo = (id) => {
        // Memfilter array todos dan menghapus todo dengan id yang sesuai
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        // Container utama untuk aplikasi todo list
        <div className="todo-container">
            <h1>Daftar Tugas</h1>
            {/* Form untuk menambahkan todo baru */}
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)} // Memperbarui state inputText saat input berubah
                    placeholder="Tambah tugas baru"
                    style={{ margin: 0 }}
                />
                <button type="submit">Tambah</button>
            </form>

            {/* Daftar todos yang ditampilkan sebagai unordered list */}
            <ul className="todo-list">
                {/* Memetakan array todos ke elemen li */}
                {todos.map((todo) => (
                    // Setiap todo ditampilkan sebagai item list dengan kelas CSS conditional
                    <li key={todo.id} className={todo.completed ? "completed" : ""}>
                        <span
                            onClick={() => toggleTodo(todo.id)} // Mengubah status completed saat diklik
                            style={{ color: "white" }}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => deleteTodo(todo.id)} // Menghapus todo saat tombol diklik
                            className="delete-btn"
                        >
                            Hapus
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
