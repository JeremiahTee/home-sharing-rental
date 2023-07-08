import React from "react";
import { Avatar, Button, Menu } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Viewer } from "../../../../lib/types";

interface MenuItemsProps {
  viewer: Viewer;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer }: MenuItemsProps) => {
  console.log("viewer avatar: ", viewer.avatar);
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu key={viewer.id} title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <UserOutlined className="icon" />
          Profile
        </Item>
        <Item key="logout">
          <LogoutOutlined className="icon" />
          Log out
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <NavLink to="/login">
          <Button type="primary">Sign In</Button>
        </NavLink>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <NavLink to="/host">
          <HomeOutlined className="icon" />
          Host
        </NavLink>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
