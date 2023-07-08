import React from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Avatar, Button, Menu } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import {
  displaySuccessNotification,
  displayErrorMessage
} from "../../../../lib/utils";
import { Viewer } from "../../../../lib/types";

interface MenuItemsProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: MenuItemsProps) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: (data) => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later."
      );
    }
  });

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu key={viewer.id} title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <NavLink to={`/user/${viewer.id}`} />
          <UserOutlined className="icon" />
          Profile
        </Item>
        <Item key="/logout">
          <div onClick={handleLogOut}>
            <LogoutOutlined className="icon" />
            Log out
          </div>
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
