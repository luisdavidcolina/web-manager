import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const FIELDS = [
  { id: 'ID', name: 'Number', category: 'item' },
  { id: 'SHORTNAME', name: 'Short Name', category: 'item' },
  { id: 'CHITNAME', name: 'Chit Name', category: 'item' },
  { id: 'LONGNAME', name: 'Long Name', category: 'item' },
  { id: 'PRICE', name: 'Default Price', category: 'pricing' },
]

const Home = () => {
  const [items, setItems] = useState([])
  const [itemSelected, setItemSelected] = useState({})
  const [tab, setTab] = useState('item')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/itms')
        const data = await response.json()
        setItems(data)
        setItemSelected(data[0])
      } catch (error: any) {
        console.error(error.message)
      }
      setLoading(false)
    }

    fetchData()
  }, [])
  if (!loading)
    return (
      <div>
        <select
          className="select  select-bordered w-full max-w-xs"
          onChange={(e) => {
            const value = e.target.value
            const newSelected = items.find((itm) => itm.ID == value)
            setItemSelected(newSelected)
          }}
        >
          {items
            .sort((a, b) => {
              if (a.ID > b.ID) {
                return 1
              }
              if (a.ID < b.ID) {
                return -1
              }
              // a must be equal to b
              return 0
            })
            .map((item) => {
              return (
                <option value={item.ID} key={item.ID}>
                  {item.ID} - {item.LONGNAME} - {'Category'}
                </option>
              )
            })}
        </select>
        <br />
        <br />
        <div className="tabs">
          <a
            className={`tab tab-lifted ${tab === 'item' ? 'tab-active' : ''}`}
            onClick={() => {
              setTab('item')
            }}
          >
            Item
          </a>
          <a
            className={`tab tab-lifted ${
              tab === 'pricing' ? 'tab-active' : ''
            }`}
            onClick={() => {
              setTab('pricing')
            }}
          >
            Pricing
          </a>
        </div>
        <div className="card bg-blue shadow-xl items-center min-h-[50vh]">
          <div className="card-body">
            {tab === 'item' && (
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Settings</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {FIELDS.filter((field) => field.category === 'item').map(
                      (field) => {
                        return (
                          <tr key={field.id}>
                            <th>{field.name}</th>
                            <td>
                              <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={itemSelected[field.id]}
                              />
                            </td>
                          </tr>
                        )
                      },
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {tab === 'pricing' && (
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Pricing options</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {FIELDS.filter((field) => field.category === 'pricing').map(
                      (field) => {
                        return (
                          <tr key={field.id}>
                            <th>{field.name}</th>

                            <td>
                              <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={itemSelected[field.id]}
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
                      },
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  fetch('api/itms', {
                    method: 'POST',
                    body: JSON.stringify(itemSelected),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  else return <div />
}

export default Home
