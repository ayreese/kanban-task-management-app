import { MenuProps } from "@/interfaces/interfaces";

/* 
The menu UI component is composed of two buttons, 
edit and delete used to toggle components 
of the same name. The component takes three
props to toggle state (see interfaces.ts) 
*/

const Menu = ({
  menuToggle,
  editToggle,
  deleteToggle,
  currentView,
}: MenuProps) => {
  console.log("current", editToggle?.state);
  return (
    <>
      <div className="menu">
        <button
          onClick={() => {
            editToggle.setState(!editToggle.state);
            menuToggle.setState(!menuToggle.state);
            currentView?.setState(!currentView!.state);
          }}>
          edit
        </button>
        <button
          onClick={() => {
            deleteToggle.setState(!deleteToggle.state);
            menuToggle.setState(!menuToggle.state);
            currentView?.setState(!currentView!.state);
          }}>
          delete
        </button>
      </div>
    </>
  );
};

export default Menu;
