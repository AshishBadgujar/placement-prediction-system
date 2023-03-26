import React, { useEffect, useRef, useState } from 'react'
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { deleteStudent, getAllStudents } from '../../services/admin.service';
import { CSVLink } from "react-csv"
import { getPackageRange } from '../../services/student.service';
const { confirm } = Modal;

export default function StudentTable() {
    const [students, setStudents] = useState([])
    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        let res = await getAllStudents()
        console.log("res", res)
        let obj
        let temp = res.map(i => {
            obj = Object.assign(i.userId, i)
            obj.mobile = String(obj.mobile)
            obj.placementStatus = obj.placementStatus ? "Yes" : "No"
            obj.packageRange = getPackageRange(obj.packageRange)
            delete obj.userId
            delete obj.admin
            delete obj.hash
            delete obj.__v
            return obj
        })
        console.log(temp)
        setStudents(temp)

    }
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
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
            ...getColumnSearchProps('college'),
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
            title: 'Quantitative Aptitude',
            dataIndex: 'qa',
            key: 'qa',
            sorter: (a, b) => a.qa - b.qa
        },
        {
            title: 'Logical Reasoning',
            dataIndex: 'lr',
            key: 'lr',
            sorter: (a, b) => a.lr - b.lr
        },
        {
            title: 'Verbal Ability',
            dataIndex: 'va',
            key: 'va',
            sorter: (a, b) => a.va - b.va
        },
        {
            title: 'Programming',
            dataIndex: 'programming',
            key: 'programming',
            sorter: (a, b) => a.programming - b.programming
        },
        {
            title: 'Computer Networks',
            dataIndex: 'cn',
            key: 'cn',
            sorter: (a, b) => a.cn - b.cn
        },
        {
            title: 'Data Stuctures & Algo',
            dataIndex: 'dsa',
            key: 'dsa',
            sorter: (a, b) => a.dsa - b.dsa
        },
        {
            title: 'Machine Learning',
            dataIndex: 'ml',
            key: 'ml',
            sorter: (a, b) => a.ml - b.ml
        },
        {
            title: 'Operating System',
            dataIndex: 'os',
            key: 'os',
            sorter: (a, b) => a.os - b.os
        },
        {
            title: 'Object Orianted Programming',
            dataIndex: 'oop',
            key: 'oop',
            sorter: (a, b) => a.oop - b.oop
        },
        {
            title: 'Database Management System',
            dataIndex: 'dbms',
            key: 'dbms',
            sorter: (a, b) => a.dbms - b.dbms
        },
        {
            title: 'Active backlogs',
            dataIndex: 'activeBacklogs',
            key: 'activeBacklogs',
        },
        {
            title: 'Dead backlogs',
            dataIndex: 'deadBacklogs',
            key: 'deadBacklogs',
        },
        {
            title: 'Aggrigate CGPA',
            dataIndex: 'cgpa',
            key: 'cgpa',
            sorter: (a, b) => a.cgpa - b.cgpa
        },
        {
            title: 'Certifications',
            dataIndex: 'cert',
            key: 'cert',
        },
        {
            title: 'Internships',
            dataIndex: 'internship',
            key: 'internship',
        },
        {
            title: 'Prediction Status',
            dataIndex: 'placementStatus',
            key: 'placementStatus',
            ...getColumnSearchProps('placementStatus'),
        },
        {
            title: 'Package Range',
            dataIndex: 'packageRange',
            key: 'packageRange',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger type='primary' onClick={() => showDeleteConfirm(record._id)} >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDelete = async (studentId) => {
        let res = await deleteStudent(studentId)
        if (res.status) {
            setStudents(students.filter(i => i._id != studentId))
            message.success("Student Deleted")
        }
    }
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete Student?',
            icon: <ExclamationCircleFilled />,
            content: 'Once student is deleted they cannot login into the system they have to request again, this action is irreversible!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

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
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <h3>Registered Students</h3>
                </div>
                <Button  >
                    <CSVLink
                        filename={"students.csv"}
                        data={students}
                        onClick={() => {
                            message.success("The file is downloading")
                        }}
                    >
                        Export to CSV
                    </CSVLink>
                </Button>
            </div>
            <Table columns={columns} dataSource={students} scroll={{
                x: "inherit",
            }} />
        </div>

    )
}



