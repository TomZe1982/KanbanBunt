import './Header.css'
import styled from "styled-components/macro";

export default function Header() {
  return (
      <HeaderStyle>
    <header>
      <h1>Super Kanban</h1>
    </header>
      </HeaderStyle>
  )
}

const HeaderStyle = styled.header`
  margin: 0;
  padding: 12px;
`
