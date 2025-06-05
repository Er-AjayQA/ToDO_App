import { createContext, useContext, useEffect, useState } from "react";
import { getAllProjectsService } from "../Services/MenuServices";
import { useAuth } from "./AuthContext";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);
  const { token, companyId } = useAuth();

  const getAllProjectsList = async () => {
    let formData = {};
    let response = await getAllProjectsService(companyId, formData, token);

    setAllProjects(response.data);
  };

  useEffect(() => {
    getAllProjectsList();
  }, []);

  const data = { allProjects, getAllProjectsList };
  return <MenuContext.Provider value={data}> {children}</MenuContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => {
  return useContext(MenuContext);
};
