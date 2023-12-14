function handelForm() {

    const useState = require("react");
    const axios = require("axios");

    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "login.php",
      data: {
        username,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then(() => {
        setLogin(true);
      })
      .catch(() => {
        e = new Error();
      });
  };

  if (login === true) {
    setEmail= username
    setPassword = password
    console.log("sucess!")
     root = document.getElementById("root");
     root.innerHTML +=
        "<h1 className='display-6'> Login Successful. <a href='index.html'> Click this link to return to Arcadia </a> </h1>"
  }
  else {
    return e 
  }
}

handelForm();