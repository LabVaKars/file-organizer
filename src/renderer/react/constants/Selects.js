import { EQUALS, ENDS_WITH, STARTS_WITH, CONTAIN, MATCH } from "./StepTypes/StepFormCommon.types"
import { IS_PRESENT, IS_VISIBLE, IS_ENABLED, IS_FOCUSED, IS_SELECTED } from "./StepTypes/AssertElemState.types"

export let comparatorOptions = [
    {name: "Equals", value: EQUALS},
    {name: "Ending with", value: ENDS_WITH},
    {name: "Starting with", value: STARTS_WITH},
    {name: "Containing", value: CONTAIN},
    {name: "Matching", value: MATCH},
]

export let elemStateOptions = [
    {name: "Present", value: IS_PRESENT},
    {name: "Visible", value: IS_VISIBLE},
    {name: "Enabled", value: IS_ENABLED},
    // {name: "Focused", value: IS_FOCUSED},
    {name: "Selected", value: IS_SELECTED},
]

export let signOptions = [
    {name: "is", value: true},
    {name: "is NOT", value: false},
]