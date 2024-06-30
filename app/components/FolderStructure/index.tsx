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
const [summary, setSummary] = useState(repoSummary);
const [folderStructure, setFolderStructure] = useState<any>();
const [loading, setLoading] = useState(false);
const [summaryLoader, setSummaryLoader] = useState(false);

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
    setLoading(true);
    setIsOpen(true);
    try {
        const stringiFied = localStorage.getItem('repo') || '';
        const { url } = JSON.parse(stringiFied);
        const formData = new FormData();
        // formData.append("github_url", url);
        const name = url.split('/').pop(); 
        const repositoryName = name?.substring(0, name.lastIndexOf('.'));
        const pathName = `${repositoryName}/${path}`
        formData.append("file_path", pathName);

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

        setContent(data?.documentation[`directory/${pathName}`] || '');
        setIsSummaryModal(false);
        
    } catch (error) {
      console.error("Error in fetch request:", error);
      throw error;
    }
    setLoading(false);
  }
  
  const parseDirectoryStructure = (directoryString: string): TreeNode[] => {
    // Splitting the string into paths by line breaks
    const paths = directoryString?.split('\n') ||  [];
    const treeData: TreeNode[] = [];
  
    // Function to find or create nodes recursively
    const findOrCreateNode = (pathParts: string[], node: TreeNode): void => {
      if (pathParts.length === 0) {
        return;
      }
  
      const part = pathParts?.shift()!;
      let childNode = node.children?.find(n => n.title === part);
  
      if (!childNode) {
        const isLeaf = pathParts?.length === 0;
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
        const rootPart = parts?.shift()!;
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
  
    return treeData;
  };

  const getFullSummary =async () => {
    setSummaryLoader(true);

    try {
        const stringiFied = localStorage.getItem('repo') || '';
        const { url } = JSON.parse(stringiFied);
        const formData = new FormData();
        const name = url.split('/').pop(); 
        const repositoryName = name?.substring(0, name.lastIndexOf('.'));
        formData.append("folder_name", repositoryName);

        const response = await fetch(
          "https://df0e-2401-4900-1c19-2ea9-54-737c-c168-166a.ngrok-free.app/api/upload",
          {
            method: "POST",
            body: formData
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        setSummary(data?.summary);
        setIsSummaryModal(true);
        setIsOpen(false);
                
    } catch (error) {
      console.error("Error in fetch request:", error);
      throw error;
    }
    setSummaryLoader(false);
  }



const getDirStructure =async (documentation: string) => {

    const data = parseDirectoryStructure(documentation);
    setFolderStructure(data)
    
}

useEffect(()=>{
    console.log(documentation, 'DOC');
    if(documentation?.length){
        getDirStructure(documentation);
    }
    
},[documentation])

useEffect(()=>{
    const directory_structure = localStorage?.getItem('directory_structure');

        if(directory_structure){
            getDirStructure(JSON.parse(directory_structure));
        }
        // const summary = localStorage?.getItem('summary');
        // if(summary){
        //     setSummary(JSON.parse(summary));
        // }
},[])
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
                <div className='whole-summary' onClick={getFullSummary}>Get Whole Summary</div> {summaryLoader  && <div>Generating your response...</div>}
            </div>
            <Tree
                showLine
                defaultExpandAll
                treeData={folderStructure}
            />
            
            <TextModal loading={summaryLoader} isOpen={isSummaryModal} toggleModal={toggleSummarymodal} readmeText={summary}/>
            <TextModal loading={loading} isOpen={isOpen} toggleModal={toggleModal} readmeText={content} />
        </div>
  );
};

export default FolderStructure;
