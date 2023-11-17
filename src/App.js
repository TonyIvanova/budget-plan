import "./App.css";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import { ChannelsProvider } from "./context/ChannelsContext";

function App() {
  return (
    <div className="App">
      <ChannelsProvider>
        <BudgetPage></BudgetPage>
      </ChannelsProvider>
    </div>
  );
}

export default App;
