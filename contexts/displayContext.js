const { createContext, useState } = require("react");

const BooleanContext = createContext();

export const BooleanProvider = ({ children }) => {
  const [displayright, setDisplayRight] = useState(false);

  const toggleBooleanValue = () => {
    setDisplayRight((prev) => !prev);
  };

  return (
    <BooleanContext.Provider value={{ displayright, toggleBooleanValue }}>
      {children}
    </BooleanContext.Provider>
  );
};

export default BooleanContext;
