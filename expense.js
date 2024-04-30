import React from 'react'

function Expense() {
    const [Data, setData] = React.useState({})
    const [Array, setArray] = React.useState([])
    const [updateIdx, setUpdateIdx] = React.useState()
    const handleChange = (e, type) => {
        if (type === 'reason') {
            setData({ ...Data, reason: e.target.value })
        }
        else if (type === 'amount') {
            setData({ ...Data, amount: e.target.value })
        }
        else if (type === 'Credit/debit') {
            setData({ ...Data, credit: e.target.value })
        }
    }
    const handleClick = () => {
        setArray([...Array, Data])
        Array.push(Data)
        console.log(Array)
        setData({
            reason: '',
            amount: '',
            credit: ''

        })
    }
    const deletehandleClick = (idx) => {
        const deletearray = [...Array]
        deletearray.splice(idx, 1)
        setArray(deletearray);

    }
    const updateClick = (idx) => {
        console.log(Array[idx])
        setData(Array[idx])
        setUpdateIdx(idx)
    }
    const handleUpClick = () => {
        // let obj=Array[updateIdx]
        // obj.reason=Data.reason
        // setData(obj)
        // console.log(obj)
        // let obj1=Array[updateIdx]
        // obj.amount=Data.amount
        // setData(obj1)
        // console.log(obj1)
        // let obj2=Array[updateIdx]
        // obj.credit=Data.credit
        // setData(obj2)
        // console.log(obj2)
        let obj = Array[updateIdx]
        obj.reason = Data.reason
        obj.amount = Data.amount
        obj.credit = Data.credit
        setData(obj)
        setData({
            reason: '',
            amount: '',
            credit: ''
        })


    }

    return (
        <>
            {/* <table>
      <tr><th>reason</th></tr>
      <tr><th>amount</th></tr>
      <tr><th>credit/debit</th></tr>
       {Array && Array.map((val)=>(
       <tr><td>{val.reason}</td>
      
    <td>{val.amount}</td>
    <td>{val.credit}</td></tr>
    ))} 
    </table> */}
            <div style={{ backgroundColor: '#45CFDD' }}>
                <center><h1 style={{ backgroundColor: '#6527BE', color: 'white' }}>expense tracker</h1></center><hr />
                <div class="container" >
                    <label>Reason:</label>
                    <input type="text" value={Data.reason} onChange={(e) => { handleChange(e, 'reason') }} />
                    <label>amount:</label>
                    <input type="text" value={Data.amount} onChange={(e) => { handleChange(e, 'amount') }} />
                    <label>Credit/debit:</label>
                    <input type="text" value={Data.credit} onChange={(e) => { handleChange(e, 'Credit/debit') }} />&nbsp;
                    <input type="button" class="btn btn-outline-dark" value="Submit" onClick={(e) => { handleClick() }} />
                    <button class="btn btn-outline-dark col-md-1 mx-2" onClick={(e) => { handleUpClick() }}>Update</button>
                </div><hr />
                {/* <table> */}
                <div style={{ margin: '0' }} class="container text-center">
                    <div class="row">

                        <div style={{ marginLeft: '1cm' }} class="col-md-3">
                            reason
                        </div>
                        <div style={{ marginLeft: '1cm' }} class="col-md-3">
                            amount
                        </div>
                        <div style={{ marginLeft: '1cm' }} class="col-md-3">
                            credit/debit    </div>
                    </div>
                </div>

                {Array && Array.map((val, idx) => (
                    //      <tr class="row"><td class="col">{val.reason}</td>

                    //   <td class="col">{val.amount}</td>
                    //   <td class="col">{val.credit}</td>
                    // <td class="col"> <button onClick={()=>deletehandleClick()}>delete</button></td>
                    //   </tr>
                    <div class="">
                        <div class="row m-2 text-center">
                            <p class="col-md-3">{val.reason}</p>
                            <p class="col-md-3">{val.amount}</p>
                            <p class="col-md-3">{val.credit}</p>
                            <button class="btn btn-outline-dark col-md-1" onClick={() => { deletehandleClick() }}>delete</button>
                            <button class="btn btn-outline-dark col-md-1 mx-2" onClick={() => { updateClick(idx) }}>Update</button>
                        </div>
                    </div>
                ))}
                {/* </table> */}
            </div>
        </>
    )
}

export default Expense;