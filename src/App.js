import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";
import "./App.scss";

function App() {
  return (
    <div className="trello-dinhquanganh">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
