import {Link} from "react-router-dom";
import styled from "styled-components/macro";


export default function NavBar() {

    return (
        <NavBarStyle>
            <Link to="/">Home</Link>
            <Link to="/board/open">Open</Link>
            <Link to="/board/in_progress">In Progress</Link>
            <Link to="/board/done">Done</Link>
            <Link to="/impressum">Impressum</Link>
        </NavBarStyle>
    )


}

const NavBarStyle = styled.nav`
  display: flex;
  justify-content: space-evenly;
  background-color: sandybrown;

  a {
    text-decoration: none;
    color: black;
  border: solid 2px grey;
  background-color: lightgray;
  padding: 0 3px}
;


`