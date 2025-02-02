import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { SiGithub } from "react-icons/si";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";

export const DropdownSelector = ({ selectedValue, onSelect }) => {
  const [placeHolder, setPlaceHolder] = useState("select")
  const accounts = ["Facebook", "Github", "Instagram", "Linkedin", "Portfolio", "X", "WhatsApp", "Website", "Other"]

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

        {accounts.map((item) => {
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
