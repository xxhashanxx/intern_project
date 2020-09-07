import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ContactsIcon from "@material-ui/icons/Contacts";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ViewConfigIcon from "@material-ui/icons/ViewComfy";

const useGetSideMenu = () => {
  const userDataObj = localStorage.getItem("userDataObj");

  let arr = new Array();

  if (userDataObj) {
    const convertedObj = JSON.parse(userDataObj);
    const userData = convertedObj.userData;
    if (userData.role == "manager" || userData.role == "data_entry") {
      arr.push(
        {
          title: "Home",
          href: "/home",
          icon: HomeIcon,
          permision: ["manager", "editor"],
        },
        {
          title: "Basic Data",
          href: "/user-management",
          icon: PeopleAltIcon,
          permision: ["manager", "editor"],
          items: [
            {
              title: "Relationship Manager",
              href: "/user-management/relationship-manager",
            },
            {
              title: "Trustee",
              href: "/user-management/trustee",
            },
            {
              title: "Collateral",
              href: "/user-management/collateral",
            },
            {
              title: "Lawyers",
              href: "/user-management/lawyers",
            },
            {
              title: "Default Values",
              href: "/default/default-list",
              icon: "",
            },
          ],
        },

        {
          title: "Investor",
          href: "/customer/customer-list",
          icon: AccessibilityIcon,
          permision: ["manager", "editor"],
        },
        {
          title: "Issuer",
          href: "/issuer/issuer-list",
          icon: ContactsIcon,
          permision: ["manager", "editor"],
        },
        {
          title: "Issue",
          href: "/issue/issue-list",
          icon: AssignmentIcon,
          permision: ["manager", "editor"],
        },
        {
          title: "Audit Log",
          href: "/audit-log",
          icon: ViewConfigIcon,
          permision: ["manager"],
        },
        {
          title: "Report",
          href: "/report",
          icon: AssignmentIcon,
          items: [
            {
              title: "Balance Confirmation",
              href: "/report/balance-confirmation",
            },
            {
              title: "Maturity Investments",
              href: "/report/maturity-investments",
            },
          ],
        }
      );
    } else if (userData.role == "admin") {
      arr.push(
        {
          title: "Home",
          href: "/home",
          icon: HomeIcon,
          permision: ["admin"],
        },
        {
          title: "Admin Management",
          href: "/admin-management",
          icon: MarkunreadMailboxIcon,
          permision: ["admin"],
        }
      );
    }
  }
  let sideMenuItems = {
    subheader: "Overview",
    items: arr,
  };

  return [sideMenuItems];
};
export default useGetSideMenu;
