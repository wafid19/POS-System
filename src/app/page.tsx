import Image from 'next/image';
import { IoSunnyOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import Adminpic from '@/../public/img/Admin.jpg'
import Posbody from './components/Posbody';
import PosTop from './components/PosTop';
export default function Home() {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <div className="h-8 w-8 bg-green-500 rounded-full"></div>
        <h1 className="ml-2 text-xl font-bold">B-POS</h1>
      </div>
      <div className="flex items-center gap-3 space-x-4">
        <button className="px-1 py-1 rounded border "><IoSunnyOutline/></button>
        <button className="px-1 py-1 rounded border "><SlSizeFullscreen/></button>
        <div className="flex gap-3">
          <div>
            <h3 className="font-semibold">Mosharraf hosen</h3>
            <h5 className="text-end text-red-500">Admin</h5>
          </div>
          <div>
            <img className="w-[40px] h-[40px] rounded-full" src={Adminpic.src} alt="Admining" />
          </div>
        </div>
      </div>
    </header>
    <PosTop/>
    <Posbody/>
    </div>
  );
}
