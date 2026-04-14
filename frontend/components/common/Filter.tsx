import React from 'react'

export default function Filter() {
  return (
    <div className='mt-12 flex justify-between'>
       <div className="flex gap-6 flex-wrap">
        <select name="type" id="" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
            <option >Type</option>
            <option value="physical">Physical</option>
            <option value="physical">Physical</option>
        </select>
        <input type="text" name="min" placeholder='min price' className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400' />
        <input type="text" name="max" placeholder='max price' className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400' />
         <select name="brand" id="" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
            <option >Brand</option>
            <option value="physical">Physical</option>
            <option value="physical">Physical</option>
        </select>
         <select name="category" id="" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
            <option >Categories</option>
            <option value="physical">Physical</option>
            <option value="physical">Physical</option>
        </select>
         <select name="" id="" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
            <option >All filters</option>

        </select>
       </div>
       <div className="">
         <select name="" id="" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
            <option >Sort By</option>
            <option value="">Price (low to high)</option>
             <option value="">Price (low to high)</option>
              <option value="">Newest</option>
               <option value="">Oldest</option>
        </select>
       </div>
       </div>
  )
}
