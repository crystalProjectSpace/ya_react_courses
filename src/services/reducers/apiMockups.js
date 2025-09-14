
export function mockFetch(mockData) {
    global.fetch = jest.fn(() => {
        const fieldId = mockData.fieldId || 'data'
        if (!mockData.failClause) return Promise.resolve({
            json: () => Promise.resolve({
                [fieldId]: mockData.data,
                success: true
            }),
            ok: true,
            status: 200,
        })

        return Promise.resolve({
            json: () => Promise.resolve({
                data: null,
                success: false
            }),
            ok: false,
            status: 400,
        })
    })
}
