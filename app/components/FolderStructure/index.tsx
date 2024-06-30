import React, { use, useEffect, useState } from 'react';
import { Tree, Button, Tooltip } from 'antd';
import TextModal from '../TextModal';
import { FolderOutlined, FileOutlined } from '@ant-design/icons';
import './tree.css';

interface TreeNode {
  title: JSX.Element | string;
  key: string;
  children?: TreeNode[];
}

const FolderStructure = (props: any ) => {

const { documentation, repoName, repoSummary } = props;
const [isOpen, setIsOpen] = useState<boolean>(false);
const [isSummaryModal, setIsSummaryModal] = useState<boolean>(false);
const [content, setContent] = useState('');
const [folderStructure, setFolderStructure] = useState<any>();

// const generateTreeData = (documents: any): TreeNode[] => {
//   const rootNode: TreeNode = { title: 'Root', key: '0', children: [] };
//   let keyIndex = 0;

//   const addNode = (path: string[], node: TreeNode, content: string) => {
//     let currentLevel = rootNode;

//     for (let i = 0; i < path.length; i++) {
//       const part = path[i];
//       const isLast = i === path.length - 1;
//       let childNode = currentLevel.children?.find(child => child.title === part);

//       if (!childNode) {
//         keyIndex++;
//         const newKey = `${currentLevel.key}-${keyIndex}`;

//         if (isLast) {
//           // It's a file, make it a leaf node with a clickable button
//           childNode = {
//             title: (
//               <Tooltip title="Click to view summary">
//                 <Button type="link" onClick={() => showModal(content)}>
//                   {part}
//                 </Button>
//               </Tooltip>
//             ),
//             key: newKey
//           };
//         } else {
//           // It's a folder
//           childNode = { title: part, key: newKey, children: [] };
//         }

//         if (currentLevel.children) {
//           currentLevel.children.push(childNode);
//         }
//       }

//       currentLevel = childNode;
//     }
//   };


//   Object.keys(documents).forEach(filePath => {
//     const pathParts = filePath.split('/');
//     addNode(pathParts, rootNode, documents[filePath]);
//   });

//   return rootNode.children || [];
// };

interface TreeNode {
    title: React.ReactNode;
    key: string;
    icon: React.ReactNode;
    children?: TreeNode[];
  }

  const getFileDoc = async (path: string) => {

    console.log(path,'PATH');

    if(path === ''){
        return;
    }

    try {
        const stringiFied = localStorage.getItem('repo') || '';
        const { url } = JSON.parse(stringiFied);
        const formData = new FormData();
        // formData.append("github_url", url);
        formData.append("file_path", path);

        const response = await fetch(
          "https://df0e-2401-4900-1c19-2ea9-54-737c-c168-166a.ngrok-free.app/api/single-file",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data);
        
    } catch (error) {
      console.error("Error in fetch request:", error);
      throw error;
    }
    // setLoading(false);
  }
  
  const parseDirectoryStructure = (directoryString: string): TreeNode[] => {
    // Splitting the string into paths by line breaks
    const paths = directoryString.split('\n');
    const treeData: TreeNode[] = [];
  
    // Function to find or create nodes recursively
    const findOrCreateNode = (pathParts: string[], node: TreeNode): void => {
      if (pathParts.length === 0) {
        return;
      }
  
      const part = pathParts.shift()!;
      let childNode = node.children?.find(n => n.title === part);
  
      if (!childNode) {
        const isLeaf = pathParts.length === 0;
        childNode = {
          title: part,
          key: node.key + '/' + part,
          icon: isLeaf ? <FileOutlined /> : <FolderOutlined />,
          children: isLeaf ? undefined : []
        };
  
        if (isLeaf) {
          childNode.title = (
            <Tooltip title="Click to view details">
              <Button type="link" onClick={() => getFileDoc(childNode?.key || '')}>
                {part}
              </Button>
            </Tooltip>
          );
        }
  
        node.children = node.children || [];
        node.children.push(childNode);
      }
  
      if (pathParts.length > 0) {
        findOrCreateNode(pathParts, childNode);
      }
    };
  
    // Iterating over each path and building the tree
    paths.forEach(path => {
      const parts = path.split('/');
      if (parts.length > 0) {
        const rootPart = parts.shift()!;
        let rootNode = treeData.find(node => node.title === rootPart);
        if (!rootNode) {
          rootNode = {
            title: rootPart,
            key: rootPart,
            icon: <FolderOutlined />,
            children: []
          };
          treeData.push(rootNode);
        }
        findOrCreateNode(parts, rootNode);
      }
    });
  
    console.log('Tree Data:', treeData); // Log the generated tree data for debugging
    return treeData;
  };



const getDirStructure =async (documentation: string) => {

    const data = parseDirectoryStructure(documentation);
    // const treeData = generateTreeData(documentation);
    setFolderStructure(data)
    
}

useEffect(()=>{
    console.log(documentation, 'DOC');
    if(documentation){
        getDirStructure(documentation);
    }
    
},[documentation])

const toggleModal = () =>{
    setIsOpen(!isOpen);
  }
const toggleSummarymodal = () =>{
    setIsOpen(false);
    setIsSummaryModal(!isSummaryModal);
  }

  const showModal = (content: string) => {
    setIsSummaryModal(false);
    setContent(content);
    setIsOpen(true);
  };

  return (
        <div className="dark-tree" >
            <div style={{background: 'black', color: 'white', padding: '10px 50px', display: 'flex', gap: '20px'}}>
                {/* <div>{repoName}</div> */}
                <div className='whole-summary' onClick={toggleSummarymodal}>Get Whole Summary</div>
            </div>
            <Tree
                showLine
                defaultExpandAll
                treeData={folderStructure}
            />
            
            <TextModal isOpen={isSummaryModal} toggleModal={toggleSummarymodal} readmeText={repoSummary}/>
            <TextModal isOpen={isOpen} toggleModal={toggleModal} readmeText={content} />
        </div>
  );
};

export default FolderStructure;
