import React from 'react';
import useRequest from '../hooks/useRequest'
const URL = 'http://localhost:8000/api/users'
export default function Table() {
  const [data, options, setOptions] = useRequest(URL);
  //currentPage = 当前页 totalPage = 总页数 list = 数据
  console.log(data)
  const { currentPage, totalPage, list } = data
  console.log(currentPage, totalPage, list)
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {
            list.map(item => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <nav>
        <ul>
          {
            new Array(totalPage).fill(0).map((item, index) => (
              <li>
                <button onClick={() => setOptions({ ...options, currentPage: index + 1 })} className="btn btn-primary">{index + 1}</button>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}