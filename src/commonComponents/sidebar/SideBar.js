import './sidebar.css'

const Sidebar = (props) => {
    return (
        <aside className="sidebarcommon" style={{ width: props.toggle ? "35vw" : "0vw", transition: "width 0.5s" }}>
            <div><button onClick={() => props.close()}>X</button></div>
            {props.component}
        </aside>
    );
};

export default Sidebar;
