const lengthOfList = (list =[])=>list.length
const eq = (val1,val2)=>val1===val2
const dateString = (isoString)=>new Date(isoString).toLocaleString()

export default{
    lengthOfList,
    eq,
    dateString
}