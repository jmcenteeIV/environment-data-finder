"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Dropdown from "./components/Dropdown";
type YamlDataType = Map<string, Map<string, string>>;

export default function Home() {
  const [yamlData, setYamlData] = useState<YamlDataType>(new Map<string, Map<string, string>>());
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const data = await res.json();
      // Convert JSON object to Map
      const mapData: YamlDataType = new Map(
        Object.entries(data).map(([key, value]) => [
          key,
          new Map(Object.entries(value as Record<string, string>)),
        ])
      );
      setYamlData(mapData);
    };

    fetchData();
  }, []);

  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  
  const environments = Array.from(yamlData.keys()); // list of all the environments
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>(""); // value for the selected key

  const handleEnvironment = (item: string) => {
    setSelectedEnvironment(item); // Update the state with the selected item
    console.log('Selected item:', selectedEnvironment);
    console.log('Yaml Data:', yamlData);
  
    const environmentMap = yamlData.get(item);
    if (environmentMap) {
      console.log('Environment Data:', environmentMap);
      setSelectedKeys(Array.from(environmentMap.keys()));
    } else {
      setSelectedKeys([]);
    }
  
    console.log('Selected item:', item);
  }
  const handleKey = (item: string) => {
    setSelectedKey(item); // Update the state with the selected item
    const value = yamlData.get(selectedEnvironment as string)?.get(item);
    if (selectedEnvironment && value) {
      if (typeof value === "string") {
        setSelectedValue(value);
      }else {
        setSelectedValue(JSON.stringify(value, null, 3));
      } 
    }
    else {
      setSelectedValue("");
    }
    console.log('Selected item:', item);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 >Environment Switcher</h1>
        <div >
          <Dropdown type={"environment"} data={environments} onSelect={handleEnvironment}/>
        </div>
        {selectedEnvironment &&
        <div >
          <Dropdown type={"key"} data={selectedKeys} onSelect={handleKey}/>
          {
            selectedKey && selectedValue &&
            <div>
              <pre>
                Selected value: {selectedValue}
              </pre>
            </div>
            }
        </div>
        }
      </main>
    </div>
  );
}
