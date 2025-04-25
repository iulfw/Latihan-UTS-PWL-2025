"use client";
import { useEffect, useState } from 'react';
export default function MatkulPage() {
  const [matkuls, setMatkuls] = useState([]);
  const [kode, setKode ] = useState('');
  const [nama, setNama ] = useState('');
  const [msg, setMsg ] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const fetchMatkuls = async () => {
    const res = await fetch('/api/matkul');
    const data = await res.json();
    setMatkuls(data);
  };

  useEffect(() => {
    fetchMatkuls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/matkul', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, kode, nama }),
    });

    if (res.ok) {
      setMsg('Saved Successfully!');
      setKode('');
      setNama('');
      setEditId(null);
      setFormVisible(false);
      fetchMatkuls();
    } else {
      setMsg('Failed to Save Data!');
    }
  };

  const handleEdit = (item) => {
    setKode(item.kode);
    setNama(item.nama);
    setEditId(item.id);
    setFormVisible(true);
  };
  
  return (
    <div>
      <button
        onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Close Form' : 'Add Matkul'}
      </button>
      {formVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              placeholder="Insert Kode"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Insert Nama Matkul"
              required            
            />
          </div>
          <button type="submit">Save</button>
          <p>{msg}</p>
        </form>
      )}

      <br></br>

      <table border="1">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama Matkul</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {matkuls.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.kode}</td>
              <td>{item.nama}</td>
              <td><button onClick={() => handleEdit(item)}>Edit</button></td>
            </tr>
          ))}
          {matkuls.length === 0 && (
            <tr>
              <td colSpan="4">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>    
    </div>
  );
}