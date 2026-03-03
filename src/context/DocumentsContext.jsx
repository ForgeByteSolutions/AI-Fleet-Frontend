// import { createContext, useContext, useState } from "react";

// const DocumentsContext = createContext();

// export const DocumentsProvider = ({ children }) => {
//   const [documents, setDocuments] = useState([]);

//   const addDocument = (doc) => {
//     setDocuments((prev) => [...prev, doc]);
//   };

//   const updateDocumentStatus = (docId, status) => {
//     setDocuments((prev) =>
//       prev.map((doc) =>
//         doc.docId === docId ? { ...doc, status } : doc
//       )
//     );
//   };

//   return (
//     <DocumentsContext.Provider
//       value={{ documents, addDocument, updateDocumentStatus }}
//     >
//       {children}
//     </DocumentsContext.Provider>
//   );
// };

// export const useDocuments = () => useContext(DocumentsContext);

import { createContext, useContext, useState } from "react";

const DocumentsContext = createContext();

export const DocumentsProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);

  const addDocument = (doc) => {
    setDocuments((prev) => [...prev, doc]);
  };

  const updateDocumentStatus = (docId, status) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.docId === docId ? { ...doc, status } : doc
      )
    );
  };

  return (
    <DocumentsContext.Provider
      value={{ documents, addDocument, updateDocumentStatus }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  return useContext(DocumentsContext);
};