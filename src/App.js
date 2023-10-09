import MyRoutes from "./routes";
import { ConfigProvider } from "antd";
const App = () => {
  return (
    <>
    <ConfigProvider
      theme={{
          token: {
          fontFamily: 'Poppins', // replace with your desired font,
          fontSize: 13,
          colorPrimary: "#0067b2",
          colorInfo: "#0067b2",
          colorSuccess: "#42b086",
          borderRadiusXS: 16,
          borderRadiusSM: 16,
          borderRadius: 16,
          borderRadiusLG: 16

          }
        
      }}
      >
          <MyRoutes />
        </ConfigProvider>  
    </>
  );
};

export default App;
