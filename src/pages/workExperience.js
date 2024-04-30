import { useContext } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";

const WorksExperiences = () => {
    const {currentStep,setCurrentStep,originalDetails} = useContext(StepsContext)
    const {uuid} = useParams()
    const navigate = useNavigate();
    return ( <div>
<div className="flex justify-between items-center">
        <div>
        <h1 className="font-bold text-3xl">Work Experience</h1>
        <p className="text-lg text-gray-500 mt-2">Add or remove experiences here</p>
        </div>
        <div>
            <div className="bg-white rounded-full">
            <button className="py-2 px-4 bg-secondary font-bold text-secondary bg-opacity-20 rounded-full ">Step 5</button>
            </div>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
        {
            originalDetails.experience.map((item)=>{
                return <div className=" py-3 px-5 bg-white border border-gray-200 rounded shadow">
                    <p> <span className="font-bold">{item.employer_name} </span>| 2023 - 2024</p>
                     <span className=" capitalize">{item.sub_location}, Tanzania</span>
                    <div className="flex justify-end">
                    <div className="font-bold text-primary mt-3 cursor-pointer bg-primary bg-opacity-15 py-2 px-4 rounded-full">Add</div>
                    </div>
                </div>
            })
        }
        </div>
        <div className="flex justify-end space-x-2 mt-4 items-center">
                  <h1 onClick={()=>{
                      navigate(-1)
                      setCurrentStep(currentStep-1)
                  }} className="font-bold text-gray-800 cursor-pointer">Prev</h1>
                  <button onClick={()=>{
                    navigate(`/skills/${uuid}`)
                    setCurrentStep(currentStep+1)
                  }} className="py-3 px-5  bg-primary hover:scale-105 transition-all rounded-full font-bold cursor-pointer text-white">Continue</button>
                </div>
    </div> );
}
 
export default WorksExperiences;