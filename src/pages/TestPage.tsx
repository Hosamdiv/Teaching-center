import { useState, useRef, useEffect } from "react";

interface IUser {
  id: number;
  username: string;
  age: number;
  address: string;
}

const TestPage = () => {
  const [users, setUsers] = useState<IUser[]>(() => {
    const saveUsers = localStorage.getItem("users");
    return saveUsers ? JSON.parse(saveUsers) : [];
  });
  
  const [formData, setFormData] = useState<IUser>({
    id: 0,
    username: "",
    age: 0,
    address: ""
  });

  // refs لكل input + الزرار
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);



  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);


  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | HTMLButtonElement | null>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };



  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = { ...formData, id: Date.now() };

    setUsers([...users, newUser]);

    setFormData({ id: 0, username: "", age: 0, address: "" });
    usernameRef.current?.focus(); // يرجع لأول input
  };


  return (
    <div>
      <form className="space-x-3" onSubmit={handelSubmit}>
        <input
          ref={usernameRef}
          className="border rounded p-1"
          name="username"
          type="text"
          value={formData.username}
          onChange={handelInput}
          onKeyDown={(e) => handleKeyDown(e, ageRef)}
          placeholder="name"
        />
        <input
          ref={ageRef}
          className="border rounded p-1"
          name="age"
          type="number"
          value={formData.age}
          onChange={handelInput}
          onKeyDown={(e) => handleKeyDown(e, addressRef)}
          placeholder="age"
        />
        <input
          ref={addressRef}
          className="border rounded p-1"
          name="address"
          type="text"
          value={formData.address}
          onChange={handelInput}
          onKeyDown={(e) => handleKeyDown(e, submitRef)}
          placeholder="address"
        />
        <button
          ref={submitRef}
          className="border px-3 py-1 mt-2 rounded"
          type="submit"
        >
          submit
        </button>
      </form>

      <ul className="border mt-3 w-[95%] m-auto rounded p-3">
        <h1 className="text-3xl font-medium mb-2 text-blue-600">Data User</h1>
        {users.map((u) => (
          <li key={u.id} className="border-t border-green-500 p-1 ">
            <p>UserNane : {u.username}</p>
            <p>Age : {u.age}</p>
            <p>Address : {u.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
