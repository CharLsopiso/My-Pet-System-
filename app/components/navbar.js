"use client";

import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useUser } from "@/app/context/UserContext";
import { useRouter, usePathname } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    sessionStorage.removeItem("PUID");
    setUser(null);
    router.push("/login");
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      bg="success"
      data-bs-theme="dark"
      className="shadow-sm px-5 py-3"
    >
      <Container fluid>
        <Navbar.Brand href="/user" className="text-white">Charls' Pets</Navbar.Brand>
        <Navbar.Toggle className="border-0" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              href="/user" 
              className={` ${pathname === "/user" ? "bg-light text-success rounded" : ""}`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              href="/user/owner" 
              className={` ${pathname === "/user/owner" ? "bg-light text-success rounded" : ""}`}
            >
              Owners
            </Nav.Link>
            <Nav.Link 
              href="/user/specie" 
              className={` ${pathname === "/user/specie" ? "bg-light text-success rounded" : ""}`}
            >
              Specie
            </Nav.Link>
            <Nav.Link 
              href="/user/breed" 
              className={` ${pathname === "/user/breed" ? "bg-light text-success rounded" : ""}`}
            >
              Breed
            </Nav.Link>
            <Nav.Link 
              href="/user/pet" 
              className={` ${pathname === "/user/pet" ? "bg-light text-success rounded" : ""}`}
            >
              Pets
            </Nav.Link>
            <Nav.Link 
              href="/user/users" 
              className={` ${pathname === "/user/users" ? "bg-light text-success rounded" : ""}`}
            >
              Users
            </Nav.Link>
            <Nav.Link href="#" className="d-lg-none text-white">
              Profile
            </Nav.Link>
            <Nav.Link href="" className="d-lg-none text-white" onClick={handleLogout}>
              Log out
            </Nav.Link>
            <div className="d-flex align-items-center">
              <Image
                src={
                  user?.avatar
                    ? `http://localhost/mypets/api/avatar/${user.avatar}`
                    : "/assets/blank_profile.webp"
                }
                alt={`${user?.first_name || "First name"} ${
                  user?.last_name || "Last name"
                }`}
                className="rounded-circle d-none d-md-block ms-4"
                width={42}
                height={42}
              />
              <NavDropdown
                title={<span>{user?.username}</span>}
                id="navbarScrollingDropdown"
                className="d-none d-md-block"
              >
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
