'use client'

import { Checkbox, Clipboard, Radio } from "flowbite-react"
import { Label, Select } from "flowbite-react";
import { useState } from "react";
import { Textarea } from "flowbite-react";
import { Button } from "flowbite-react";

export default function Notes(props: any) {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [caseType, setCaseType] = useState('');
    const [issue, setIssue] = useState('');
    const [troubleshooting, setTroubleshooting] = useState('');
    const [resolution, setResolution] = useState('');

    const handleCaseTypeChange = (event: any) => {
        setCaseType(event.target.value);
    };

    const handleSubjectChange = (event: any) => {
        setSelectedSubject(event.target.value);
    };

    const handleIssueChange = (event: any) => {
        setIssue(event.target.value);
    };

    const handleTroubleshootingChange = (event: any) => {
        setTroubleshooting(event.target.value);
    };

    const handleResolutionChange = (event: any) => {
        setResolution(event.target.value);
    };

    function resetAll(){
        setIssue("")
        setTroubleshooting("")
        setResolution("")
        setSelectedSubject("")
    }

    const notes = 
`{START CASE SUMMARY}
|Problem Description:

${issue}

|Frequency of failure:
|How to reproduce the failure:
|Error message:
|Windows Version:
|BIOS Version:
|Troubleshooting:

${troubleshooting}

|Resolution:

${resolution}

|Leave blank:
{END CASE SUMMARY}`;

    return (
        <>
            <div className="flex items-end gap-2 w-full md:px-24 lg:max-w-md mx-auto lg:px-0">
                <div className="w-full rounded-lg">
                    <div className="mb-5 block">
                        <Label htmlFor="subjects" value="Case subject" />
                    </div>
                    <fieldset className="flex max-w-md flex-row gap-4 mb-5">
                        <div className="flex items-center gap-2">
                            <Radio className="focus:ring-0 focus:ring-offset-0" id="regular" name="case_type" value="" defaultChecked onChange={handleCaseTypeChange}/>
                            <Label htmlFor="regular">Regular case</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio className="focus:ring-0 focus:ring-offset-0" id="jira" name="case_type" value="Jira | " onChange={handleCaseTypeChange}/>
                            <Label htmlFor="jira">Jira esc</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio className="focus:ring-0 focus:ring-offset-0" id="exec" name="case_type" value="EE | " onChange={handleCaseTypeChange}/>
                            <Label htmlFor="exec">Executive esc</Label>
                        </div>
                    </fieldset>
                    <Select id="subjects" required onChange={handleSubjectChange} value={selectedSubject}>
                    <option value="" disabled selected>-- Select an option --</option>
                        {props.list.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </Select>
                </div>
                <Clipboard valueToCopy={caseType + props.lob + selectedSubject} label="Copy" />
            </div>

            <div className="flex flex-col gap-4 mt-5 justify-center w-full md:px-24 lg:max-w-md lg:px-0 mx-auto">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="issue" value="Problem description" />
                    </div>
                    <Textarea onChange={handleIssueChange} id="issue" name="issue" placeholder="Enter the customer's issue..." required rows={6} value={issue}/>
                </div>

                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="troubleshooting" value="Troubleshooting" />
                    </div>
                    <Textarea onChange={handleTroubleshootingChange} id="troubleshooting" name="troubleshooting" placeholder="Enter the steps completed to resolve problem..." required rows={6} value={troubleshooting}/>
                </div>

                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="resolution" value="Resolution" />
                    </div>
                    <Textarea onChange={handleResolutionChange} id="resolution" name="resolution" placeholder="Enter the resolution provided..." required rows={6} value={resolution}/>
                </div>
                <div className="w-full mt-2 flex justify-between">
                    <Button onClick={() => resetAll()} color="light" >Reset all</Button>
                    <Clipboard valueToCopy={notes} label="Copy notes" />
                </div>
            </div>
        </>
    )
}