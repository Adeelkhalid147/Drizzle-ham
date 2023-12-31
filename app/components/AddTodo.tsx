"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { NewTodo } from '../lib/drizzle'
import { useRouter } from 'next/navigation'

const AddTodo = () => {
    const [task,setTask]= useState<NewTodo | null>(null)
    const {refresh} = useRouter()

const handleSubmit = async () => {
    try {
        if (task){
        const res = await fetch("/api/todo",{
            method:"POST",
            body: JSON.stringify({
                task:task.task
            })
        })
        // console.log(res.ok)
        refresh()
    }
    } catch (error) {
        // console.log("error")
        
    }
}

// foam mai jb b koi button bnate hai to HTML us ko Submit ka button consider krti h or pora page refresh kr deti
// as liye button k type button rkhen gy or agr submit wala button bnnane h to phr type mai submit likhna ho ga

  return (
    <div>
        <form className='w-full flex gap-x-3'>
            <input
            onChange={(e) => setTask({task: e.target.value})}
            
            className='rounded-full w-full py-3.5 px-5 border focus:outline-secondary' type='text'/>
            <button type='button' onClick={handleSubmit} className='bg-primary shrink-0 p-4 rounded-full bg-gradient-to-b from-primary to-secondary'>
                <Image src={"/Vector.png"} alt='Vector' height={20} width={20}/>
            </button>
        </form>
    </div>
  )
}

export default AddTodo