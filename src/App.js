import MyRoutes from "./routes";
import { ConfigProvider } from "antd";
const App = () => {
  return (
    <>
    <ConfigProvider
      theme={{
          token: {
          fontFamily: 'Poppins', // replace with your desired font,
          fontSize: 13
        }
      }}
    >
        <MyRoutes />
        </ConfigProvider>  
    </>
  );
};

export default App;
