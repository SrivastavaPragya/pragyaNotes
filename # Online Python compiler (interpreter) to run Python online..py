# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.
print("Start small. Ship something.")


# def find_min_max(arr):
#     # smallest=arr[0]
#     # largest=arr[0]
#     smallest=float('inf')
#     largest=float('-inf')
#     for i in arr:
#         if(i<smallest):
#               smallest=i
#
#         if(i>largest):
#              largest=i
#
#     print(smallest,largest)


# arr = [5, 2, 9, 1, 7, 3]

# find_min_max(arr)


# def secondLargest(arr):
#     largest=arr[0]
#     secondLargest=arr[0]
#     for i in arr:
#         if(i>largest):
#             largest=i
#     for i in arr:
#          if(i>secondLargest and i<largest):
#              secondLargest=i
#
#     return secondLargest


# arr=[2,5,6,7]

# secondLargestNUM=secondLargest(arr)

# print(secondLargestNUM)


# def missinNo(arr,n):
#     arrSum=0
#     OriginalSum=n*(n+1)/2
#
#
#     for i in arr:
#         arrSum=arrSum+i
#
#     missingNo=OriginalSum-arrSum
#     return missingNo


# arr=[1,2,3,5]
# num=missinNo(arr,5)
# print(num)


# def duplicate(arr):
#     seen=set()
#     for i in arr:
#         if (i in seen):
#             return i
#         seen.add(i)
#     return -1


# arr=[1,2,3,5,5]
# num=duplicate(arr)
# print(num)


# def rightRotate(arr,k):
#     k=k%len(arr)
#     return arr[-k:]+arr[:-k]


# arr = [1, 2, 3, 4, 5]
# k = 2
# num=rightRotate(arr,k)
# print(num)


# def rotateArray(arr, k):
#     n = len(arr)
#     k = k % n
#
#     arr.reverse()
#
#     arr[:k] = reversed(arr[:k])
#     arr[k:] = reversed(arr[k:])
#
#     return arr

# arr = [1, 2, 3, 4, 5]
# k = 2
# num=rotateArray(arr,k)
# print(num)


# arr = [1, 2, 3]

# x = reversed(arr)

# print(list(x))
# print(arr)

# def mergeArrays(arr1,arr2):
#     i=0
#     j=0
#     result=[]
#     while i<len(arr1) and j<len(arr2):
#         if(arr1[i]<arr2[j]):
#             result.append(arr1[i])
#             i=i+1
#         else:
#             result.append(arr2[j])
#             j=j+1
#
#
#     while(i<len(arr1)):
#         result.append(arr1[i])
#         i=i+1
#
#     while(j<len(arr2)):
#         result.append(arr2[j])
#         j=j+1
#     return result


# arr1 = [1, 3, 5, 7]
# arr2 = [2, 4, 6, 8]

# print(mergeArrays(arr1, arr2))


def TwoSum(arr,sum):
    for i in range(len(arr)):
        for j in range(i+1,len(arr)):
            if(arr[i]+arr[j]==sum):
                return [i,j]
    return []


arr = [2, 7, 11, 15]
target = 8

print(TwoSum(arr, target))


# ——————————————————
# Two Sum —> Two Pointer approach
def TwoSum(arr,target):

    i=0;
    j=len(arr)-1


    while(i<j):
        if(arr[i]+arr[j]==target):
            return [i,j]
        if(arr[i]+arr[j]<target):
            i=i+1
        else:
            j=j-1
    return []

arr = [1, 2, 4, 7, 11]
target = 9

print(TwoSum(arr, target))

# ————————————————
# Two sum —>>> hashmaps
def TwoSum(arr, target):
    seen = {}

    for i in range(len(arr)):
        complement = target - arr[i]

        if complement in seen:
            return [seen[complement], i]

        seen[arr[i]] = i

    return []


arr = [2, 7, 11, 15]
target = 9

print(TwoSum(arr, target))


# ……………………………………………………………………………………………………….
# Strings

def palind(s):
    s1=list(s)
    left=0
    right=len(s1)-1
    while(left<right):
        if(s1[left]!=s1[right]):

            return 0
        else:
            left=left+1
            right=right-1
    return 1


s="madam"
print(palind(s))


def anagram(s1,s2):
    if(len(s1)!=len(s2)):
        return False

    s1=sorted(s1)
    s2=sorted(s2)

    if(s1!=s2):
        return False
    return True


s1="care"
s2="race"

print(anagram(s1,s2))


def removeDuplicate(s2):
    s=list(s2)
    seen=set()
    result=[]

    for i in s:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return "".join(result)

s1 = "listenbiiiu"

print(removeDuplicate(s1))


def reverseWords(s):
    words = s.split()
    words.reverse()
    return " ".join(words)


s = "I love Python"

print(reverseWords(s))


def checkRotation(s1,s2):
    if(len(s1)!=len(s2)):
        return False

    temp=s1+s1

    if(s2 in temp):
        return True
    return False



s1 = "abcd"
s2 = "cdab"

print(checkRotation(s1, s2))

# ———————————————————————— ————————————————————————
def firstNonRepeating(s):
    seen={}
    for i in s:
        if i in seen:
            seen[i]+=1
        else:
            seen[i]=1

    for i in s:
        if (seen[i]==1):
            return i
    return -1

s = "aabbcde"

print(firstNonRepeating(s))

# ——————————————————————————————————————————————————
def frequency(arr):
    seen={}
    for i in arr:
        if i in seen:
            seen[i]+=1
        else:
            seen[i]=1

    for key,value in seen.items():
        print(key,"->",value)

arr=[11,2,33,3,4,3,5,6,7,8,96]
s=frequency(arr)
print(s)


def occurring_oddTime(arr):
    seen={}
    result=[]
    for i in arr:

        if i in seen:
          seen[i]+=1
        else:
            seen[i]=1


    for key, value in seen.items():
      if value%2!=0:
          result.append(key)


    return result


arr = [1, 2, 3, 2, 3, 1, 3, 4]

print(occurring_oddTime(arr))


def sameNO(arr1,arr2):
    seen={}
    if (len(arr1)!=len(arr2)):
        return False
    for i in arr1:
        if i in seen:
            seen[i]+=1
        else:
            seen[i]=1

    for i in arr2:
        if i  not in seen:
            return False
    return True

arr1=[1,2,3,4]
arr2=[4,1,2,3]
s=sameNO(arr1,arr2)
print(s)


# ——————————————————————————————————————————————————
# Searching
# Linear Search
def search(arr,n):
    for i in arr:
        if i==n:
            return True
    return False

arr=[1,2,3,4]
n=4
s=search(arr,n)
print(s)


# Binary Search
def binarySearch(arr, n):
    i = 0
    j = len(arr) - 1

    while i <= j:
        mid = (i + j) // 2

        if arr[mid] == n:
            return mid

        if arr[mid] < n:
            i = mid + 1
        else:
            j = mid - 1

    return -1


arr = [1, 3, 5, 7, 9, 11]
n = 7

print(binarySearch(arr, n))


def CountOccurence(arr,target):
    seen={}
    occurence=0
    for i in arr:
        if i in seen:
            seen[i]+=1
        else:
            seen[i]=1


    for key,value in seen.items():
        if(key==target):
            occurence=value
    return occurence

s=[1,2,2,2,3]
n=2
s=CountOccurence(s,n)
print(s)


def flatten(arr):
    result=[]
    for i in arr:
        if isinstance(i,list):
            result.extend(flatten(i))
        else:
            result.append(i)
    return result
arr = [1, [2, 3], [4, [5, 6]]]

print(flatten(arr))


def removeZeroes(arr):
    count = 0

    for i in arr:
        if i == 0:
            count += 1

    arr[:] = [i for i in arr if i != 0]

    for i in range(count):
        arr.append(0)

    return arr


arr = [0, 1, 0, 3, 12]

print(removeZeroes(arr))
