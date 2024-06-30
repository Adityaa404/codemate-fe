import React, { useEffect, useState } from 'react';
import { Treebeard } from 'react-treebeard';
import TextModal from '../components/TextModal';
import { FolderOpenOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons';
import FolderStructure from '../components/FolderStructure';

interface TreeNode {
    name: string;
    toggled?: boolean;
    children?: TreeNode[];
    icon?: string;
    content?: string; // Add content property to store documentation
}


// Define the TreeNode interface for your tree structure
interface TreeNode {
    name: string;
    toggled?: boolean;
    children?: TreeNode[];
    icon?: string;
    content?: string;  // Optional content property if you store additional data
}

const decorators = {
    Header: ({style, node}: any) => {
    const iconType = node.children ? (
        node.toggled ? <FolderOpenOutlined /> : <FolderOutlined />
    ) : <FileOutlined />;
    return (
        <div >
            <div >
                {iconType}
                {node.name}
            </div>
        </div>
    );
},
}
const FolderStructureComponent: React.FC<{ documentation: any }> = ({ documentation }) => {
  const [data, setData] = useState(generateTreeFromDocumentation(documentation));
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  function generateTreeFromDocumentation(doc: any): TreeNode {
    const root: TreeNode = { name: 'root', toggled: true, children: [], icon: 'folder' };  // Root is always a folder
  
    const addNode = (path: string[], node: TreeNode, currentLevel: TreeNode, content?: string) => {
      if (path.length === 0) {
        return;
      }
  
      const name = path.shift() || '';  // Default to empty string if shift returns undefined
      const isFolder = path.length > 0;  // If there are more parts in the path, it's a folder
  
      // Search for an existing child node or create a new one
      let childNode = currentLevel.children?.find(child => child.name === name);
      if (!childNode) {
        childNode = { 
          name: name, 
          toggled: isFolder, 
          children: isFolder ? [] : undefined, 
          icon: isFolder ? 'folder' : 'file', 
          content: isFolder ? undefined : content  // Only set content for leaf nodes
        };
        currentLevel.children?.push(childNode);
      }
  
      // Continue recursion to add deeper levels or set content at the correct node
      addNode(path, node, childNode, content);
    };
  
    // Iterate over all keys in the documentation object
    Object.keys(doc).forEach(filePath => {
      const pathParts = filePath.split('/');  // Split path to create hierarchy
      addNode(pathParts, { name: filePath }, root, doc[filePath]);  // Pass the documentation content
    });
  
    return root;
  }
  
useEffect(() => {
    if(documentation){
        const obj = generateTreeFromDocumentation(documentation);
        setData(obj);
    }
  }, [documentation]);

  return (
    <div style={{ height: '100vh', background: "#21252B" }}>
        <FolderStructure />
        <TextModal isOpen={isModalVisible} toggleModal={handleCloseModal} readmeText={modalContent} />
    </div>
  );
};

export default FolderStructureComponent;
