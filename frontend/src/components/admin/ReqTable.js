import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, message } from 'antd';
import { approveReq, getStudentReq, rejectReq } from '../../services/admin.service';


export default function ReqTable() {
    const [data, setData] = useState()
    useEffect(() => {
        getReq()
    }, [])

    const getReq = async () => {
        let res = await getStudentReq()
        console.log("res", res)
        let temp = res.map(i => {
            i.student.reqId = i._id
            return i.student
        })
        setData(temp)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'College',
            dataIndex: 'college',
            key: 'college',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'RollNo',
            dataIndex: 'rollno',
            key: 'rollno',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleApprove(record.reqId)}>
                        Approve
                    </Button>
                    <Button danger type='primary' onClick={() => handleReject(record.reqId)} >
                        Reject
                    </Button>
                </Space>
            ),
        },
    ];
    const handleApprove = async (reqId) => {
        console.log("jsvdh", reqId)
        let res = await approveReq(reqId)
        console.log(res)
        if (res.status) {
            message.success("Request Approved")
            setData(data.filter(i => i.resId != reqId))
        }
    }
    const handleReject = async (reqId) => {
        let res = await rejectReq(reqId)
        console.log(res)
        if (res.status) {
            message.danger("Request Approved")
            setData(data.filter(i => i.resId != reqId))
        }
    }
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h3>Registration Requests</h3>
            </div>
            <Table columns={columns} dataSource={data} scroll={{
                x: "inherit",
            }} />
        </div>
    )
}
