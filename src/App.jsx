import { data } from 'autoprefixer';
import axios  from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [input , setInput] = useState('')
  const [description , setDescription] = useState('')
  const [todo , setTodo] = useState(null)


  useEffect(()=>{
    async function getData(){
      const response = await axios('https://critical-catfish-ahmedkhan-c8db3b79.koyeb.app/api/v1/todo')
      console.log(response.data)
      setTodo(response.data.data)
    }

    getData()
  } , [])

  const addTodo = async (event)=>{
    event.preventDefault();
    console.log(input);

    const response = await axios.post('https://critical-catfish-ahmedkhan-c8db3b79.koyeb.app/api/v1/todo' , {
      title: input,
      description
    })
    
    console.log(response)
    setTodo([...todo , response.data.data])

  }


  const editTodo = async (id , index)=>{
    const updated = prompt('Enter updated val')
    const response = await axios.put(`https://critical-catfish-ahmedkhan-c8db3b79.koyeb.app/api/v1/todo/${id}` , {
      title: updated
    })
    todo[index].title = updated
    setTodo([...todo])
    console.log(response)
  }

  const deleteTodo = async (id , index)=>{
    const response = await axios.delete(`https://critical-catfish-ahmedkhan-c8db3b79.koyeb.app/api/v1/todo/${id}`)
    todo.splice(index , 1)
    setTodo([...todo])
    console.log(response)
  }
  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Todo App</h1>

    <form onSubmit={addTodo} className="space-y-4">
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter your todo"
        value={input}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Enter description"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Add Todo
      </button>
    </form>

    <ul className="mt-6 space-y-4">
      {todo ? (
        todo.map((item, index) => {
          return (
            <li
              key={item._id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteTodo(item._id, index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => editTodo(item._id, index)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })
      ) : (
        <h1 className="text-center text-gray-500">Loading...</h1>
      )}
    </ul>
  </div>
</div>

    </>
);
};

export default App;
