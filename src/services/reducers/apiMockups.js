
export function mockFetch(mockData) {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ data: mockData, success: true }),
        ok: true,
        status: 200,
        })
    )
}
