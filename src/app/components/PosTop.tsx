"use client"

import React from "react";
import { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { AutoComplete, Input } from "antd";
import type { AutoCompleteProps } from "antd";
import { CloseSquareFilled } from '@ant-design/icons';
import { HiArrowUturnLeft } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";

const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

    const mockVal = (str: string, repeat = 1) => ({
      value: str.repeat(repeat),
    });
    

function PosTop() {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [option, setOption] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];


  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between h-[97px] items-center bg-white">
        <div className="flex items-center">
          <div className="input-group">
            <AutoComplete
              popupMatchSelectWidth={252}
              style={{ width: 400 , height:40}}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
              size="large"
            >
              <Input.Search  prefix={<FiUser />} size="large" placeholder="Select Customer....." enterButton />
            </AutoComplete>
            {/* <button className="w-[50px] h-[30px] bg-neutral-500"></button> */}
          </div>
        </div>
        <div className="flex items-center">
        <AutoComplete
        options={option}
        style={{ width: 400, height:40 }}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="Customized clear icon"
        allowClear={{ clearIcon: <CloseSquareFilled /> }}
      />
        </div>
        <div className="flex items-center gap-3 space-x-4">
          <button className="px-1 py-1 rounded border ">
            <IoSunnyOutline />
          </button>
          <button className="px-1 py-1 rounded border text-white bg-green-600">
            <HiArrowUturnLeft />
          </button>
          <button className="px-1 py-1 rounded border  text-white bg-green-600">
            <SlSizeFullscreen />
          </button>
          <button className="px-1 py-1 rounded border  text-white bg-green-600">
            <TbListDetails />
          </button>
          <button className="px-1 py-1 rounded border  text-white bg-green-600">
            <IoExitOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PosTop;
