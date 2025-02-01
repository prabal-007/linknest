import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { SiGithub } from "react-icons/si";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";


export const DropdownSelector = ({ selectedValue, onSelect }) => {
  const [placeHolder, setPlaceHolder] = useState("select")
  // const accounts = ["Facebook", "Github", "Instagram", "Linkedin", "Portfolio", "X", "WhatsApp", "Website", "Other"]

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

        {/* {accounts.map((item) => {
          <DropdownItem key={item}
            className="dropdown-item">
            <span className="dropdown-span">
              {item}
              {item === "Github" ? <SiGithub /> : item === "Other" ? <LiaExternalLinkSquareAltSolid /> : null}
            </span>
          </DropdownItem>
        })} */}

        <DropdownItem
          key="Facebook"
          className="dropdown-item">
          <span className="dropdown-span">Facebook<img src="/icons/facebook.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="Github"
          className="dropdown-item">
          <span className="dropdown-span">Github<SiGithub /></span>
        </DropdownItem>

        <DropdownItem
          key="Instagram"
          className="dropdown-item">
          <span className="dropdown-span">Instagram<img src="/icons/insta.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="Linkedin"
          className="dropdown-item">
          <span className="dropdown-span">Linkedin<img src="/icons/linkedin.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="Portfolio"
          className="dropdown-item">
          <span className="dropdown-span">Portfolio<img src="/icons/portfolio.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="X"
          className="dropdown-item">
          <span className="flex">X/Twitter<img src="/icons/x.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="WhatsApp"
          className="dropdown-item">
          <span className="dropdown-span">WhatsApp<img src="/icons/whatsapp.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="Website"
          className="dropdown-item">
          <span className="dropdown-span">Website<img src="/icons/website.png" className="size-6" alt="" /></span>
        </DropdownItem>

        <DropdownItem
          key="Other"
          className="dropdown-item">
          <span className="dropdown-span">Other<LiaExternalLinkSquareAltSolid /></span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
