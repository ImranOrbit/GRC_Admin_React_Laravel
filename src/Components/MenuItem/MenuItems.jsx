import { useState } from "react";
import { Menu, Layout } from "antd";
import { AiFillHome } from "react-icons/ai";
import { FaChartLine } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GoPackageDependents } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbTableShortcut } from "react-icons/tb";
import { MdUnsubscribe } from "react-icons/md";
import { FaRegistered } from "react-icons/fa6";
import { FaFirstAid } from "react-icons/fa";
import { GiPodiumSecond } from "react-icons/gi";
import { FaDrupal } from "react-icons/fa";
import { PiContactlessPaymentFill } from "react-icons/pi";
import { MdCastConnected } from "react-icons/md";
import { FaUserPlus, FaChalkboardTeacher, FaVideo, FaBlog, FaEdit } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { GiNurseFemale, GiGearHammer, GiCook, GiBriefcase } from "react-icons/gi";
import { FcCollaboration } from "react-icons/fc";
import { MdOutlineLeaderboard } from "react-icons/md";


const items = [
  {
    key: "1",
    icon: <AiFillHome style={{ color: "#f16f22" }} />,
    label: <Link to="/">Homepage</Link>,
  },
  {
    key: "sub1",
    label: "User Registration",
    icon: <FaUserPlus style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "2",
        icon: <FaUserPlus style={{ color: "#f16f22" }} />,
        label: <Link to="/users">Register List</Link>,
      },
    ],
  },

    {
    key: "sub14",
    label: "Country Registration",
    icon: <FaUserPlus style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "25",
        icon: <FaUserPlus style={{ color: "#f16f22" }} />,
        label: <Link to="/countrylist">Country Register List</Link>,
      },
    ],
  },
    {
    key: "sub15",
    label: "Scholarship Registration",
    icon: <FaUserPlus style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "26",
        icon: <FaUserPlus style={{ color: "#f16f22" }} />,
        label: <Link to="/scholarshiplist">Scholarship Register List</Link>,
      },
    ],
  },
  {
    key: "sub2",
    label: "Success Review",
    icon: <MdReviews style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "3",
        icon: <MdReviews style={{ color: "#f16f22" }} />,
        label: <Link to="/adminreview">Success Review Create</Link>,
      },
      {
        key: "18",
        icon: <MdReviews style={{ color: "#f16f22" }} />,
        label: <Link to="/successeditdelete">Success Edit Delete</Link>,
      },
    ],
  },
  {
    key: "sub3",
    label: "Video URL",
    icon: <FaVideo style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "4",
        icon: <FaVideo style={{ color: "#f16f22" }} />,
        label: <Link to="/videourl">Video URL</Link>,
      },
    ],
  },
  {
    key: "sub4",
    label: "Blogs",
    icon: <FaBlog style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "5",
        icon: <FaBlog style={{ color: "#f16f22" }} />,
        label: <Link to="/blogs">Blogs</Link>,
      },
      {
        key: "6",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: <Link to="/blogitem">Blog Item</Link>,
      },
    ],
  },
  {
    key: "sub5",
    label: "Students Review",
    icon: <MdReviews style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "7",
        icon: <MdReviews style={{ color: "#f16f22" }} />,
        label: <Link to="/reviewtwo">Students Review Create</Link>,
      },
      {
        key: "19",
        icon: <MdReviews style={{ color: "#f16f22" }} />,
        label: <Link to="/studentsrevieweditdelete">Students Edit Delete</Link>,
      },
    ],
  },
  {
    key: "sub6",
    label: "Nursing Course",
    icon: <GiNurseFemale style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "8",
        icon: <GiNurseFemale style={{ color: "#f16f22" }} />,
        label: <Link to="/nursing">Nursing</Link>,
      },
      {
        key: "9",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: <Link to="/nursingeditdelete">Nursing Edit & Delete</Link>,
      },
    ],
  },
  {
    key: "sub7",
    label: "Accounting Course",
    icon: <FaChalkboardTeacher style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "10",
        icon: <FaChalkboardTeacher style={{ color: "#f16f22" }} />,
        label: <Link to="/accounting">Accounting</Link>,
      },
      {
        key: "11",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: <Link to="/accountingeditdelete">Accounting Edit & Delete</Link>,
      },
    ],
  },
  {
    key: "sub8",
    label: "Engineering Course",
    icon: <GiGearHammer style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "12",
        icon: <GiGearHammer style={{ color: "#f16f22" }} />,
        label: <Link to="/engineering">Engineering</Link>,
      },
      {
        key: "13",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: <Link to="/engineeringeditdelete">Engineering Edit & Delete</Link>,
      },
    ],
  },
  {
    key: "sub9",
    label: "Food and Hospitality Course",
    icon: <GiCook style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "14",
        icon: <GiCook style={{ color: "#f16f22" }} />,
        label: <Link to="/foodandhospitality">Food and Hospitality</Link>,
      },
      {
        key: "15",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: (
          <Link to="/foodandhospitalityeditdelete">
            Food Hospitality Edit & Delete
          </Link>
        ),
      },
    ],
  },
  {
    key: "sub10",
    label: "Business Studies Course",
    icon: <GiBriefcase style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "16",
        icon: <GiBriefcase style={{ color: "#f16f22" }} />,
        label: <Link to="/businessstudies">Business Studies</Link>,
      },
      {
        key: "17",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: (
          <Link to="/businessstudieseditdelete">
            Business Studies Edit & Delete
          </Link>
        ),
      },
    ],
  },

   {
    key: "sub12",
    label: "Collaboration",
    icon: <FcCollaboration style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "21",
        icon: <FcCollaboration style={{ color: "#f16f22" }} />,
        label: <Link to="/collaboration">Create Collaboration</Link>,
      },
      {
        key: "22",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: (
          <Link to="/collaborationeditdelete">
            Collaboration Edit & Delete
          </Link>
        ),
      },
    ],
  },
   {
    key: "sub13",
    label: "Leadership",
    icon: <MdOutlineLeaderboard style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "23",
        icon: <MdOutlineLeaderboard style={{ color: "#f16f22" }} />,
        label: <Link to="/leadership">Create Leadership</Link>,
      },
      {
        key: "24",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: (
          <Link to="/leadershipeditdelete">
            Leadership Edit & Delete
          </Link>
        ),
      },
    ],
  },

    {
    key: "sub16",
    label: "Visa Success",
    icon: <MdOutlineLeaderboard style={{ color: "#f16f22" }} />,
    children: [
      {
        key: "27",
        icon: <MdOutlineLeaderboard style={{ color: "#f16f22" }} />,
        label: <Link to="/visasuccess">Create Visa Success</Link>,
      },
      {
        key: "28",
        icon: <FaEdit style={{ color: "#f16f22" }} />,
        label: (
          <Link to="/visasuccesseditdelete">
            Visa Success Edit & Delete
          </Link>
        ),
      },
    ],
  },
];


const MenuItems = ({ theme, toggleTheme }) => {
  const [selectedKey, setSelectedKey] = useState("1"); // Store the selected menu key
  const [openKeys, setOpenKeys] = useState([]); // Store the open submenu keys

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Update the selected menu key
  };

  const handleOpenChange = (keys) => {
    // If keys are empty, close all submenus
    if (keys.length === 0) {
      setOpenKeys([]);
    } else {
      // Open the last clicked submenu and close others
      setOpenKeys([keys[keys.length - 1]]);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Layout.Sider
        width={256}
        theme={theme}
        style={{
          background: theme === "dark" ? "#001529" : "#fff",
          transition: "all 0.3s ease-in-out",
          position: "sticky",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Menu with items */}
        <Menu
          mode="inline"
          theme={theme}
          selectedKeys={[selectedKey]} // Keep the selected item highlighted
          openKeys={openKeys} // Manage which submenus are open
          onOpenChange={handleOpenChange} // Handle submenu toggle
          items={items.map((item) => ({
            ...item,
            icon: (
              <div
                className={`transition-transform duration-300 flex justify-center items-center ${
                  selectedKey === item.key ? "scale-125 text-custom-blue" : ""
                }`}
                style={{ fontSize: "20px" }}
              >
                {item.icon}
              </div>
            ),
          }))}
          onClick={handleMenuClick} // Handle item click to change selection
        />
      </Layout.Sider>
    </Layout>
  );
};

export default MenuItems;
