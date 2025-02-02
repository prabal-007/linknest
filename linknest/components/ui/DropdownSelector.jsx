"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { SiGithub } from "react-icons/si";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";

export const DropdownSelector = ({options, selectedValue, onSelect }) => {
  const [placeHolder, setPlaceHolder] = useState("select")

  const handleSelectionChange = (selection) => {
    if (selection instanceof Set) {
      const selected = Array.from(selection)[0];
      onSelect(selected);
      setPlaceHolder(selected);
    }
  };

  return (
    <Dropdown showArrow backdrop="none">
      <DropdownTrigger>
        <Button
          variant="shadow"
          className="bg-white rounded-full">
          {placeHolder}<IoIosArrowDropdownCircle />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions"
        selectionMode="single"
        className="bg-gray-100 border-2 border-gray-400 rounded-lg w-32"
        selectedKeys={selectedValue}
        onSelectionChange={handleSelectionChange}>

        {options.map((item) => {
          return (
            <DropdownItem key={item}
              className="dropdown-item">
              <span className="dropdown-span justify-end">
                {item}
                {item === "Github" ? <SiGithub />
                  : item === "Other" ? <LiaExternalLinkSquareAltSolid />
                    : item === "X" ? <img src={`/icons/x.png`} className="size-6" alt="" />
                      : <img src={`/icons/${item.toLowerCase()}.png`} className="size-6" alt="" />}
              </span>
            </DropdownItem>)
        })}
      </DropdownMenu>
    </Dropdown>
  );
}


export const UserDropdown = ({ options, selectedValue, onSelect }) => {
  const [placeHolder, setPlaceHolder] = useState(selectedValue || "Select");

  const handleSelectionChange = (selection) => {
    if (selection instanceof Set) {
      const selected = Array.from(selection)[0];
      onSelect(selected);
      setPlaceHolder(selected);
    }
  };

  return (
    <Dropdown showArrow backdrop="none">
      <DropdownTrigger>
        <Button variant="shadow" className="bg-white rounded-full min-w-28 w-fit flex justify-between">
          {placeHolder} <IoIosArrowDropdownCircle />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Static Actions"
        selectionMode="single"
        className="bg-gray-100 border-2 border-gray-400 text-black rounded-lg w-32"
        selectedKeys={new Set([selectedValue])}
        onSelectionChange={handleSelectionChange}
      >
        {options.map((item) => (
          <DropdownItem key={item.value} className="dropdown-item">
            <span className="dropdown-span justify-end">
              {item.label}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
