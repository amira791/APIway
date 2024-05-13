import React, { useState, useEffect } from "react";
import ManipulateVersion from "../../hooks/VersionHook";
import AddVersion from "./AddVersion";
const VersionTable = ({ selectedAPI, onReturnClick }) => {
    const [isVisibleActive, setIsVisibleActive] = useState(true);
    const [isArrowDownActive, setIsArrowDownActive] = useState(true);
    const [isVisibleDraft, setIsVisibleDraft] = useState(true);
    const [isArrowDownDraft, setIsArrowDownDraft] = useState(true);
    const [isVisibleDeprec, setIsVisibleDeprec] = useState(true);
    const [isArrowDownDeprec, setIsArrowDownDeprec] = useState(true);
    const { getAPIversions, versions, updateVersionState, updateCurrentVersion } = ManipulateVersion();
    const [activeVersions, setActiveVersions] = useState([]);
    const [draftVersions, setDraftVersions] = useState([]);
    const [deprecVersions, setDeprecVersions] = useState([]);

    const [selectedVersion, setSelectedVersion] = useState(null);
    const [selectedVersionState, setSelectedVersionState] = useState("");

    const [isCurrentChecked, setIsCurrentChecked] = useState(true);

    const [showAddVersionsSection, setShowAddVersionsSection] = useState(false);

   
    const toggleVisibilityActive = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsVisibleActive(!isVisibleActive);
        setIsArrowDownActive(!isVisibleActive); // Toggle the icon state
    };
    const toggleVisibilityDraft = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsVisibleDraft (!isVisibleDraft);
        setIsArrowDownDraft (!isVisibleDraft); // Toggle the icon state
    };
    const toggleVisibilityDeprec = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsVisibleDeprec (!isVisibleDeprec);
        setIsArrowDownDeprec (!isVisibleDeprec); // Toggle the icon state
    };
    useEffect(() => {
        getAPIversions(selectedAPI.id_api);
    }, [selectedAPI]);
    useEffect(() => {
        setActiveVersions(versions.filter(version => version.state === 'Active'));
        setDraftVersions(versions.filter(version => version.state === 'Draft'));
        setDeprecVersions(versions.filter(version => version.state === 'Deprecated'));
    }, [versions]);

    useEffect(() => {
        const currentVersion = versions.find(version => version.current);
        if (currentVersion!=null){
            console.log('CURRENT VERSION', currentVersion.state);
            setSelectedVersion(currentVersion);
            setSelectedVersionState(currentVersion.state);
            setIsCurrentChecked(true);
        }
        

    }, [versions]);

    const handleVersionClick = (version) => {
        setSelectedVersion(version);
        setSelectedVersionState(version.state);
        if(version.current){setIsCurrentChecked(true)}
        else{
        setIsCurrentChecked(false);}
    };

    const handleStateChange = (newState) => {
        updateVersionState(selectedVersion, newState);
        getAPIversions(selectedAPI.id_api);

        
    }
    const handleCurrentChange = () => {
        const newCurrentState = !isCurrentChecked;
        console.log("New Current State: ", newCurrentState)
        if (newCurrentState) {
            updateCurrentVersion(selectedVersion, 1);
            //setSelectedVersion(updatedVersion);
        } else {
            updateCurrentVersion(selectedVersion, 0);
        }
        setIsCurrentChecked(newCurrentState);
        getAPIversions(selectedAPI.id_api);
    };

    const handleReturnClick = () => {
        setShowAddVersionsSection(false);
    };
    const handleAddClick = (e) => {
        e.preventDefault(); 
        setShowAddVersionsSection(true);
    };
    const handleReturnToVersions= () => {
        setShowAddVersionsSection(false);
      };
    return (
        <div>
           <div className="returnButtonContainer">
                <button className="returnToAPIlist" onClick={onReturnClick} title="Return to APIs">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
          <div className="manage-versions" style={{ display: !showAddVersionsSection ? "block" : "none" }}>
          
            <div className="versions_section">
                <form>
                    <div className="versions_dialog">
                    <div className="versions_list">
                            <div className="versions_listTitle">
                                <span> Versions List </span>
                                <button onClick={handleAddClick}> Add version</button>
                            </div>
                            <div className="class_list">
                                <ul>
                                    <li className="li_groupe">
                                        <div>
                                            <button onClick={toggleVisibilityActive}><i className={`fa-solid fa-chevron-${isArrowDownActive ? 'down' : 'right'}`}></i></button>
                                        </div>
                                        <div>
                                            <span>Active</span>
                                        </div>
                                    </li>
                                    {activeVersions.map(version => (
                                        <li className="li_elements"style={{ display: isVisibleActive ? 'block' : 'none' , backgroundColor: version === selectedVersion ? 'rgba(0, 85, 218, 0.15)' : 'transparent'}} onClick={() => handleVersionClick(version)}>
                                            <div>
                                                <span>V{version.num_version}</span>
                                                {version.current && (
                                                <span>Current</span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                    <li className="li_groupe">
                                        <div>
                                            <button onClick={toggleVisibilityDraft}><i className={`fa-solid fa-chevron-${isArrowDownDraft ? 'down' : 'right'}`}></i></button>
                                        </div>
                                        <div>
                                            <span>Draft</span>
                                        </div>
                                    </li>
                                    {draftVersions.map(version => (
                                        <li className="li_elements"style={{ display: isVisibleDraft ? 'block' : 'none', backgroundColor: version === selectedVersion ? 'rgba(0, 85, 218, 0.15)' : 'transparent' }} onClick={() => handleVersionClick(version)}>
                                            <div>
                                                <span>V{version.num_version}</span>
                                            </div>
                                        </li>
                                    ))}

                                    <li className="li_groupe">
                                        <div>
                                            <button onClick={toggleVisibilityDeprec}><i className={`fa-solid fa-chevron-${isArrowDownDeprec ? 'down' : 'right'}`}></i></button>
                                        </div>
                                        <div>
                                            <span>Deprecated</span>
                                        </div>
                                    </li>
                                    {deprecVersions.map(version => (
                                        <li className="li_elements"style={{ display: isVisibleDeprec ? 'block' : 'none' , backgroundColor: version === selectedVersion ? 'rgba(0, 85, 218, 0.15)' : 'transparent'}} onClick={() => handleVersionClick(version)}>
                                            <div>
                                                <span>V{version.num_version}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    </div>
                    {selectedVersion && (
                    <div className="version_state">
                            <div>
                            <span>V{selectedVersion.num_version}</span>
                            </div>
                            <div>
                                <div className="state_element">
                                    <label>
                                        <div className="switch_state_input">
                                            <input type="radio" checked={selectedVersionState === 'Active'} 
                                                onClick={(e) => {
                                                    
                                                        handleStateChange('Active');
                                                        setSelectedVersionState('Active');
                                                
                                                }}
                                            />
                                            <div className="radio1"
                                                style={{
                                                    backgroundColor: selectedVersionState === 'Active' ? 'rgb(42, 113, 224)' : 'rgba(0, 0, 0, 0.08)',
                                                    borderColor: selectedVersionState === 'Active' ? 'rgb(51, 119, 225)' : 'rgb(214, 217, 219)',

                                                }}
                                            >
                                            <div className="radio2"
                                                style={{
                                                    backgroundColor: selectedVersionState === 'Active' ? 'rgb(255, 255, 255)' : 'rgb(117, 117, 117)'
                                                }}
                                            >
                                            </div>
                                            </div>
                                            
                                        </div>
                                        <div className="switch_state_label">
                                            <div>
                                                <span>Active</span>
                                                <span>Version developers can subscribe to </span>
                                            </div>

                                        </div>
                                    </label>
                                    <div className="switch_state_current">
                                    <div>
                                            <div className="current_state">
                                                <label>
                                                    <div>
                                                        <input type="checkbox" checked={isCurrentChecked} 
                                                        onChange={() => setIsCurrentChecked(!isCurrentChecked)} 
                                                        onClick={(e) => {
                                                    
                                                            handleCurrentChange()
                                                    
                                                        }}
                                                        />
                                                        
                                                        <div className="checkbox1">
                                                            {isCurrentChecked ? (
                                                            <i className="fas fa-check fa-xs"></i>
                                                            ) : null}
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                        <span>Current</span>
                                                    </div>
                                                </label>
                                                <div className="current_state2">
                                                    <span> API displayed in the Hub when a developer searches for your API </span>
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="state_element">
                                    <label>
                                        <div className="switch_state_input">
                                            <input type="radio" checked={selectedVersionState === 'Draft'} 
                                                onClick={(e) => {
                                                    
                                                        handleStateChange('Draft');
                                                        setSelectedVersionState('Draft');
                                                
                                                }}
                                            />
                                        <div className="radio1_1"
                                                style={{
                                                    backgroundColor: selectedVersionState === 'Draft' ? 'rgb(42, 113, 224)' : 'rgba(0, 0, 0, 0.08)',
                                                    borderColor: selectedVersionState === 'Draft' ? 'rgb(51, 119, 225)' : 'rgb(214, 217, 219)'
                                                }}
                                            >
                                            <div className="radio2_2"
                                                style={{
                                                    backgroundColor: selectedVersionState === 'Draft' ? 'rgb(255, 255, 255)' : 'rgb(117, 117, 117)'
                                                }}
                                            ></div>
                                            </div> 
                                        
                                        </div>
                                        <div className="switch_state_label">
                                            <div>
                                                <span>Draft</span>
                                                <span>Version initially created and visible only to the provider</span>
                                            </div>

                                        </div>
                                    </label>

                                </div>
                                <div className="state_element">
                                    <label>
                                        <div className="switch_state_input">
                                            <input type="radio" checked={selectedVersionState === 'Deprecated'} 
                                                onClick={(e) => {
                                                
                                                        handleStateChange('Deprecated');
                                                
                                                }}
                                            />
                                            <div className="radio1_1"
                                                style={{
                                                    backgroundColor: selectedVersionState === 'Deprecated' ? 'rgb(42, 113, 224)' : 'rgba(0, 0, 0, 0.08)',
                                                    borderColor: selectedVersionState === 'Deprecated' ? 'rgb(51, 119, 225)' : 'rgb(214, 217, 219)'
                                                }}
                                            >
                                            <div className="radio2_2"
                                                style={{
                                                    backgroundColor: selectedVersionState === 'Deprecated' ? 'rgb(255, 255, 255)' : 'rgb(117, 117, 117)'
                                                }}
                                            ></div>
                                            </div>
                                        </div>
                                        <div className="switch_state_label">
                                            <div>
                                                <span>Deprecated</span>
                                                <span>Version no longer recommended to use</span>
                                            </div>

                                        </div>
                                    </label>

                                </div>
                            </div>
                            <span>

                            </span>
                    </div>
                    )}
                    </div>
                </form>
            </div>
          </div>
           <div >
           {showAddVersionsSection && (
                <div id="Addversion-section">

                  <AddVersion selectedAPI={selectedAPI} onReturnClick2={handleReturnToVersions}/>

                </div>
            )}
           </div>
        </div>
    );
};
  
export default VersionTable;