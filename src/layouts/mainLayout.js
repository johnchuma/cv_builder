import { Outlet, useParams } from "react-router-dom";
import Template1 from "../templates/template1";
import { createContext, useEffect, useState } from "react";
import FromReactPdf from "../templates/fromReactPdf";
import axios from "axios";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { api } from "../utils/apiSample";

export const StepsContext = createContext() 
const MainLayout = () => {
   const [currentStep,setCurrentStep] = useState(0)
   const [showPreview,setShowPreview] = useState(false)
   const [downloading,setDownloading] = useState(false)
   const [candidate,setCandidate] = useState(null)
   const [originalDetails,setOriginalDetails] = useState(null)
   
    const steps = [
    {title:"Choose Template"},
    {title:"Introduction"},
    {title:"Professional Summary"},
    {title:"Education"},
    {title:"Work Experience"},
    {title:"Skills"},
    {title:"Proficiency"},
    {title:"Referees"},
    {title:"Complete"}]
    const {uuid} = useParams()

useEffect(()=>{
    axios.get(`https://test.ekazi.co.tz/api/cv/cv_builder/${uuid}`).then((response)=>{
         if(response){
          const data = response.data.data
          setOriginalDetails(data);
          setDoc(doc(collection(firestore,"apis"),`${uuid}`),data) 
         }
    }).catch((error)=>{
        console.log(error);
        throw error;
    })
},[])
useEffect(()=>{
   onSnapshot(doc(collection(firestore,"apis"),`${uuid}`),(value)=>{
    if(value.exists){
        setCandidate(value.data())
    }
   })
},[])
    return ( <div>
        <div className="flex">
            <div className=" w-3/12 fixed bg-primary h-screen text-white px-12 py-12">
                <h1 className="font-bold text-2xl">eKazi CV Builder</h1>
              <div className="  mt-8">
              {steps.map((item,index)=>{
                    return <div className="font-bold text-opacity-75  border-white border-opacity-50 rounded">
                      <div className="flex space-x-2 items-center">
                      <div className={`h-8 w-8  ${index<currentStep?"bg-green-600":"bg-[#6688C7]"} rounded-full flex justify-center items-center`}>
                        {index+1}
                      </div>
                        <h1>{item.title}</h1>
                      </div>
                      {index+1 != steps.length && <div className={`h-5 ${index<currentStep?"bg-green-600":"bg-[#6688C7]"} ml-4 w-[2px]`}/>}
                      
                    </div>
                })}
              </div>
            </div>
            <div className="w-9/12 ms-auto min-h-screen bg-gray-100">
            <div className=" px-12 py-12">
                <StepsContext.Provider value={{currentStep,setCurrentStep,candidate,setCandidate,originalDetails}}>
                   <Outlet/>
                </StepsContext.Provider>

            </div>
            {currentStep >0 && <div className="fixed bottom-6 left-0 right-0 py-5">
                <div className="w-3/12"></div>
                <div className="w-9/12 ms-auto flex justify-center">
                <div className="">
                    <button onClick={()=>{
                        setShowPreview(true)
                    }} className="bg-green-600 hover:scale-105 transition-all  text-white shadow-2xl font-bold rounded-full py-4 px-8">Preview template</button>
                    {showPreview && <div className={`inset-0 delay-700 bg-translate fixed  transition-all duration-500  `}>
                       <div className="w-full h-full flex justify-center items-center">
                       <div className="w-7/12 mx-auto  border-gray-200  bg-white h-[95%] shadow-4xl overflow-y-auto ">
                            <div className=" bg-gray-50">
                            <div className="px-12 flex justify-end">
                            <div onClick={()=>{
                                setShowPreview(false)
                               }} className="font-bold cursor-pointer hover:scale-105 transition-all text-gray-800  ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                               </div>
                            </div>
                           <div className="flex   justify-between px-12 py-3 border-b-2 items-center">
                               <h1 className="font-bold text-2xl ">Preview</h1>
                               <div className="flex items-center space-x-4">  
                               
                               <button onClick={()=>{
                                   setDownloading(true)
                                   axios.get('http://localhost:5000/generatePdf').then((response)=>{
                                       const link =  response.data.body.link;
                                       setDownloading(false)
                                       window.open(link,'_blank')
                                   })
                               }} className="bg-green-600 rounded-full hover:scale-105 transition-all shadow-2xl text-white flex justify-center items-center font-bold h-10 w-36">
                                   {downloading?<div className=" border-4 h-5 w-5 border-white rounded-full border-t-transparent animate-spin"></div>:"Download CV"}
                               </button>
                              
                               </div>
                             
                              
                           </div>
                            </div>
                           
                       <Template1/>
                        </div>
                       </div>
                    </div>}
                </div>
                </div>
                </div>}
            
                      
            </div>
        </div>
    </div> );
}
 
export default MainLayout;