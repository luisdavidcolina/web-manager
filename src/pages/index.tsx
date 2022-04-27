import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CSVLink } from 'react-csv'

import { FIELDS } from '../const/fields'
import { search } from '../util/search'
import { getData } from '../util/getData'
import { csvFileToArray } from '../util/csvFileToArray'

const Home = () => {
  const [items, setItems] = useState([])
  const [itemsChecked, setItemsChecked] = useState([])
  const [tableMode, setTableMode] = useState(true)
  const [itemSelected, setItemSelected] = useState({})
  const [input, setInput] = useState('')
  const [tab, setTab] = useState('pricing')
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState()
  const [array, setArray] = useState([])
  const [changedFile, setChangedFile] = useState(false)

  const lookForChanges = (newArray) => {
    const differences = items.filter((record) => {
      const item = newArray.find((i) => {
        const isEqual = String(i.ID) === String(record.ID)
        return isEqual
      })
      if (item) {
        const isChange =
          String(item.LONGNAME) !== String(record.LONGNAME) ||
          String(item.PRICE) !== String(record.PRICE)

        return isChange
      }
      return true
    })
    console.log(differences)

    return differences
  }
  const handleOnChange = (e) => {
    const newFile = e.target.files[0]
    setFile(newFile)
    e.preventDefault()
    var fileReader = new FileReader()
    if (newFile) {
      fileReader.onload = function (event) {
        const text = event.target.result
        const newArray = csvFileToArray(text)
        setArray(newArray)
        lookForChanges(newArray)
      }
      fileReader.readAsText(newFile)
    }
  }

  const filterItems = (itms) => {
    return itms.filter((item) => {
      return search(item.ID + item.SHORTNAME + item.LONGNAME, input)
    })
  }

  const router = useRouter()

  const handleClick = () => {
    const modalButton = document.getElementById('my-modal') as HTMLInputElement
    modalButton.click()

    fetch('api/itms', {
      method: 'POST',
      body: JSON.stringify(itemSelected),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const newData = await getData()
      setItems(newData)
      setItemSelected(newData[0])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (!loading)
    return (
      <div className="flex flex-col h-full gap-5">
        <div className="">
          <div className="w-full flex items-center justify-between">
            <div className="dropdown w-9/12">
              <label tabIndex={0} className="w-full " id="dropdown-label">
                <input
                  id="search-input"
                  className="input  w-full  m-auto shadow-md  "
                  type="text"
                  placeholder="Buscar"
                  autoComplete="off"
                  defaultValue={input}
                  onKeyPress={(e) => {
                    const value = e.target.value
                    setInput(value)
                  }}
                />
              </label>
              <ul
                tabIndex={0}
                className="mt-1  shadow-md menu menu-compact dropdown-content bg-base-100 rounded-box w-full"
                style={{ zIndex: 9999, maxHeight: '75vh', overflowY: 'auto' }}
              >
                {filterItems(items).map((item, i) => (
                  <li key={i}>
                    <a
                      onClick={() => {
                        setItemSelected(item)
                      }}
                    >
                      <h3>
                        {item.ID} - {item.LONGNAME} - {'Category'}
                      </h3>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn btn-square btn-ghost btn-sm w-1/12 shadow-md">
              <img src="/filter-icon.png" alt="" />
            </button>
            <label className="btn btn-square btn-ghost btn-sm w-1/12 shadow-md swap swap-rotate">
              <input
                type="checkbox"
                onClick={() => {
                  setTableMode(!tableMode)
                }}
                checked={tableMode}
                onChange={() => {
                  //
                }}
              />
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-full">
          <div className="tabs">
            <a
              className={`tab tab-bordered ${
                tab === 'item' ? 'tab-active' : ''
              }`}
              onClick={() => {
                setTab('item')
              }}
            >
              Item
            </a>
            <a
              className={`tab tab-bordered ${
                tab === 'pricing' ? 'tab-active' : ''
              }`}
              onClick={() => {
                setTab('pricing')
              }}
            >
              Pricing
            </a>
          </div>
          <div className="bg-blue shadow-md items-center h-full rounded-b-lg">
            <div className="m-3">
              <div
                className="overflow-x-auto w-full h-full overflow-y-auto"
                style={{ maxHeight: '60vh' }}
              >
                <table className="table w-full table-compact w-full ">
                  {tab === 'item' && (
                    <>
                      <thead>
                        <tr>
                          <th>Settings</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {FIELDS.filter(
                          (field) => field.category === 'item',
                        ).map((field) => {
                          return (
                            <tr key={field.id}>
                              <th>{field.name}</th>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="input input-bordered input-sm "
                                  defaultValue={itemSelected[field.id]}
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </>
                  )}

                  {tab === 'pricing' && !tableMode && (
                    <>
                      <thead>
                        <tr>
                          <th>Pricing options</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {FIELDS.filter(
                          (field) => field.category === 'pricing',
                        ).map((field) => {
                          return (
                            <tr key={field.id}>
                              <th>{field.name}</th>

                              <td>
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="input input-bordered input-sm "
                                  value={itemSelected[field.id]}
                                  defaultValue={itemSelected[field.id]}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    const newSelected = {
                                      ...itemSelected,
                                      [field.id]: value,
                                    }
                                    setItemSelected(newSelected)
                                  }}
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </>
                  )}
                  {tab === 'pricing' && tableMode && (
                    <>
                      <thead>
                        <tr>
                          <th>
                            <label>
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={itemsChecked.length !== 0}
                                onChange={() => {
                                  setItemsChecked(
                                    itemsChecked.length === 0
                                      ? filterItems(items)
                                      : [],
                                  )
                                }}
                              />
                            </label>
                          </th>
                          <th>Number</th>
                          <th>Long Name</th>
                          <th>
                            <div className="flex items-center justify-between">
                              <span>Price</span>
                              <span>
                                <input
                                  type={'file'}
                                  accept={'.csv'}
                                  id="upload-button"
                                  onChange={handleOnChange}
                                  style={{ display: 'none' }}
                                />
                                <label
                                  htmlFor={'upload-button'}
                                  className="btn btn-sm btn-outline mr-2"
                                >
                                  UP
                                </label>
                                <CSVLink
                                  data={itemsChecked.map(
                                    ({ ID, LONGNAME, PRICE }) => {
                                      return {
                                        ID,
                                        LONGNAME,
                                        PRICE,
                                      }
                                    },
                                  )}
                                  filename={'items.csv'}
                                  headers={headers}
                                  separator={';'}
                                  className="btn btn-sm btn-outline"
                                  disabled={itemsChecked.length === 0}
                                  target="_blank"
                                >
                                  DW
                                </CSVLink>
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterItems(items).map((field) => {
                          return (
                            <tr
                              key={field.ID}
                              className={`${
                                itemsChecked.includes(field) ? 'active' : ''
                              }`}
                            >
                              <th>
                                <label>
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={itemsChecked.includes(field)}
                                    onChange={() => {
                                      if (itemsChecked.includes(field)) {
                                        setItemsChecked(
                                          itemsChecked.filter(
                                            (item) => item !== field,
                                          ),
                                        )
                                      } else {
                                        setItemsChecked([
                                          ...itemsChecked,
                                          field,
                                        ])
                                      }
                                    }}
                                  />
                                </label>
                              </th>
                              <th>{field.ID}</th>
                              <th>{field.LONGNAME}</th>

                              <th>
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="input input-bordered input-sm "
                                  defaultValue={field.PRICE}
                                />
                              </th>
                            </tr>
                          )
                        })}
                      </tbody>
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-ghost shadow-md mr-5"
            onClick={handleClick}
          >
            Refresh
          </button>

          <button
            className="btn btn-ghost shadow-md"
            onClick={handleClick}
            disabled={!changedFile}
          >
            Guardar
          </button>

          <input
            type="checkbox"
            id="my-modal"
            className="modal-toggle hidden"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Congratulations random Interner user!
              </h3>
              <p className="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
              </p>
              <div className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  Yay!
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  else return <div />
}

const headers = [
  { label: 'ID', key: 'ID' },
  { label: 'LONGNAME', key: 'LONGNAME' },
  { label: 'PRICE', key: 'PRICE' },
]

export default Home
